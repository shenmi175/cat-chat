import { useCallback, useEffect, useRef, useState } from 'react';
import ChatBubble from './components/ChatBubble';
import Live2DViewer from './components/Live2DViewer';
import { getSystemState } from './utils/systemMonitor';
import { generateReply } from './utils/deepseek';
import './App.css';

const PROACTIVE_POLL_MS = 10000;
const APP_SWITCH_COOLDOWN_MS = 60 * 1000;
const LOW_BATTERY_COOLDOWN_MS = 30 * 60 * 1000;
const TIME_COOLDOWN_MS = 6 * 60 * 60 * 1000;
const LOW_BATTERY_THRESHOLD = 20;

function getDateKey(date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function getTimeTrigger(date) {
  const hour = date.getHours();
  if (hour >= 0 && hour < 5) {
    return {
      reason: `time:late-night:${getDateKey(date)}`,
      label: '深夜仍在使用电脑',
      cooldownMs: TIME_COOLDOWN_MS,
    };
  }
  return null;
}

function pickProactiveTrigger(systemState, previousApp) {
  const activeApp = systemState.activeApp?.trim() || '';

  if (
    systemState.hasBattery
    && !systemState.isCharging
    && typeof systemState.batteryPercent === 'number'
    && systemState.batteryPercent <= LOW_BATTERY_THRESHOLD
  ) {
    return {
      reason: 'battery:low',
      label: `电量低于 ${LOW_BATTERY_THRESHOLD}%`,
      cooldownMs: LOW_BATTERY_COOLDOWN_MS,
    };
  }

  if (activeApp && previousApp && activeApp !== previousApp) {
    return {
      reason: `app:${activeApp}`,
      label: `主人切换到了 ${activeApp}`,
      cooldownMs: APP_SWITCH_COOLDOWN_MS,
    };
  }

  return getTimeTrigger(new Date());
}

function App() {
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [petState, setPetState] = useState('idle'); // idle, happy, thinking
  const [modelUrl, setModelUrl] = useState('/CubismSdkForWeb-5-r.4/Samples/Resources/Wanko/Wanko.model3.json');
  const [showInput, setShowInput] = useState(false);
  const [cfg, setCfg] = useState({});
  const [modelSize, setModelSize] = useState({ width: 300, height: 400 });
  const [bubbleH, setBubbleH] = useState(0);
  const [inputH, setInputH] = useState(0);

  const prevResponseRef = useRef([]);
  const isThinkingRef = useRef(false);
  const lastActiveAppRef = useRef('');
  const lastTriggerAtRef = useRef({});

  // --- Drag: VM & Wayland robust tracking ---
  const [isDragging, setIsDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    isThinkingRef.current = isThinking;
  }, [isThinking]);

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    lastPos.current = { x: e.screenX, y: e.screenY };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const dx = e.screenX - lastPos.current.x;
      const dy = e.screenY - lastPos.current.y;

      if (dx !== 0 || dy !== 0) {
        window.electronAPI.dragUpdate(dx, dy);
        lastPos.current = { x: e.screenX, y: e.screenY };
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // --- Initial Config & Listeners ---
  useEffect(() => {
    window.electronAPI?.getConfig().then((newCfg) => {
      if (newCfg) {
        setCfg(newCfg);
        if (newCfg.modelUrl) setModelUrl(newCfg.modelUrl);
      }
    });

    const cleanupCfg = window.electronAPI?.onConfigUpdated((newCfg) => {
      if (newCfg) {
        setCfg(newCfg);
        if (newCfg.modelUrl) setModelUrl(newCfg.modelUrl);
      }
    });

    return () => {
      if (typeof cleanupCfg === 'function') cleanupCfg();
    };
  }, []);

  // --- Reactive Height Tracking ---
  const bubbleObs = useRef(null);
  const inputObs = useRef(null);

  const bubbleRefCallback = (node) => {
    if (bubbleObs.current) bubbleObs.current.disconnect();
    if (node) {
      bubbleObs.current = new ResizeObserver((entries) => {
        setBubbleH(entries[0].contentRect.height);
      });
      bubbleObs.current.observe(node);
    } else {
      setBubbleH(0);
    }
  };

  const inputRefCallback = (node) => {
    if (inputObs.current) inputObs.current.disconnect();
    if (node) {
      inputObs.current = new ResizeObserver((entries) => {
        setInputH(entries[0].contentRect.height);
      });
      inputObs.current.observe(node);
    } else {
      setInputH(0);
    }
  };

  // --- Dynamic Window Sizing ---
  useEffect(() => {
    const gap = 10;
    const minW = 200 * (cfg.globalScale || 1.0);
    const totalW = Math.max(modelSize.width, minW);
    const totalH = (bubbleH > 0 ? bubbleH + gap : 0)
      + modelSize.height
      + (showInput ? gap + inputH : 0);

    window.electronAPI?.resizeWindow(Math.round(totalW + 2), Math.round(totalH + 2));
  }, [modelSize, bubbleH, inputH, showInput, cfg.globalScale]);

  const addMessage = useCallback((text, sender) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setMessages((prev) => {
      const newLogs = [...prev, { text, sender }];
      return newLogs.slice(-5);
    });

    window.electronAPI?.addToHistory({ text, sender, time: timeStr });

    setTimeout(() => {
      setMessages((prev) => {
        if (prev.length > 0 && prev[prev.length - 1].text === text) {
          return [];
        }
        return prev;
      });
    }, 6000);
  }, []);

  const extractAndSaveMemories = useCallback(async (reply) => {
    const memoryRegex = /\[MEMORY:\s*(.*?)\]/g;
    const matches = [...reply.matchAll(memoryRegex)];
    if (matches.length === 0) return reply;

    const newFacts = matches.map((match) => match[1].trim()).filter(Boolean);
    const cleanReply = reply.replace(memoryRegex, '').trim();

    if (newFacts.length > 0) {
      await window.electronAPI.appendMemories(newFacts);
    }
    return cleanReply;
  }, []);

  const getUniqueReply = useCallback(async (prompt, isProactive) => {
    let reply = await generateReply(prompt, isProactive);
    let retryCount = 0;
    while (prevResponseRef.current.includes(reply.trim()) && retryCount < 2) {
      reply = await generateReply(`${prompt} (注意：你刚说过类似的词，请换个花样！)`, isProactive);
      retryCount++;
    }
    return reply;
  }, []);

  const triggerProactiveTalk = useCallback(async (systemData, trigger) => {
    setIsThinking(true);
    setPetState('thinking');
    try {
      let prompt = `(系统通知：触发原因【${trigger.label}】，当前时间【${systemData.time}】`;
      if (systemData.hasBattery) {
        prompt += `，所在设备电量【${systemData.batteryPercent}%】`;
      }
      if (systemData.activeApp) {
        prompt += `，主人当前正在使用软件【${systemData.activeApp}】（窗口标题：${systemData.activeWindow}）`;
      }
      prompt += '。根据性格主动说一句话。记住：严禁重复你刚说过的话！)';

      const reply = await getUniqueReply(prompt, true);
      const cleanReply = await extractAndSaveMemories(reply);
      addMessage(cleanReply, 'pet');
      setShowInput(false);

      prevResponseRef.current = [...prevResponseRef.current.slice(-2), cleanReply.trim()];

      setPetState('happy');
      setTimeout(() => setPetState('idle'), 5000);
    } catch (error) {
      console.error('Proactive talk failed:', error);
    } finally {
      setIsThinking(false);
    }
  }, [addMessage, extractAndSaveMemories, getUniqueReply]);

  // --- System state polling ---
  useEffect(() => {
    let disposed = false;

    const pollSystemState = async () => {
      const state = await getSystemState();
      if (disposed || !state || isThinkingRef.current) return;

      const previousApp = lastActiveAppRef.current;
      const activeApp = state.activeApp?.trim() || '';
      const trigger = pickProactiveTrigger(state, previousApp);

      if (activeApp) {
        lastActiveAppRef.current = activeApp;
      }

      if (!trigger) return;

      const now = Date.now();
      const lastTriggeredAt = lastTriggerAtRef.current[trigger.reason] || 0;
      if (now - lastTriggeredAt < trigger.cooldownMs) return;

      lastTriggerAtRef.current[trigger.reason] = now;
      triggerProactiveTalk(state, trigger);
    };

    pollSystemState();
    const intervalId = setInterval(pollSystemState, PROACTIVE_POLL_MS);

    return () => {
      disposed = true;
      clearInterval(intervalId);
    };
  }, [triggerProactiveTalk]);

  const handleSendMessage = async (text) => {
    addMessage(text, 'user');
    setIsThinking(true);
    setPetState('thinking');
    try {
      const systemData = await getSystemState();

      let stateContext = systemData ? `\n(背景信息 - 时间:${systemData.time}` : '';
      if (systemData) {
        if (systemData.activeApp) stateContext += `, 正使用软件:${systemData.activeApp}`;
        if (systemData.hasBattery) stateContext += `, 电量:${systemData.batteryPercent}%`;
      }
      if (stateContext) stateContext += ')';

      const prompt = `主人说：${text}${stateContext}`;
      const reply = await getUniqueReply(prompt, false);
      const cleanReply = await extractAndSaveMemories(reply);
      addMessage(cleanReply, 'pet');
      setShowInput(false);

      prevResponseRef.current = [...prevResponseRef.current.slice(-2), cleanReply.trim()];

      setPetState('happy');
    } catch {
      addMessage('呜呜...我脑子卡壳了连不上网了...', 'pet');
    } finally {
      setIsThinking(false);
      setTimeout(() => setPetState('idle'), 5000);
    }
  };

  const globalScale = cfg.globalScale || 1.0;

  return (
    <div className="app-container" style={{ '--app-scale': globalScale }}>
      {(messages.length > 0 || isThinking) && (
        <div
          ref={bubbleRefCallback}
          className="chat-area no-drag"
        >
          {messages.length > 0 && (
            <ChatBubble
              message={messages[messages.length - 1].text}
              sender={messages[messages.length - 1].sender}
            />
          )}
          {isThinking && (
            <div className="thinking-bubble">正在绞尽脑汁想词...</div>
          )}
        </div>
      )}

      <div
        className="pet-area"
        onMouseDown={handleMouseDown}
      >
        <Live2DViewer
          petState={petState}
          isDragging={isDragging}
          modelUrl={modelUrl}
          globalScale={globalScale}
          onModelLoad={setModelSize}
        />
      </div>

      {showInput && (
        <div
          ref={inputRefCallback}
          className="input-area no-drag visible"
        >
          <form onSubmit={(e) => {
            e.preventDefault();
            if (e.target.msg.value) {
              handleSendMessage(e.target.msg.value);
              e.target.msg.value = '';
            }
          }}
          >
            <input name="msg" type="text" placeholder="摸摸头并对它说话..." autoComplete="off" autoFocus={showInput} />
            <button type="submit">发送</button>
          </form>
        </div>
      )}

      {!showInput && (
        <div
          className="speak-trigger"
          onClick={() => setShowInput(true)}
          title="和它说话"
        >
          💬
        </div>
      )}
    </div>
  );
}

export default App;
