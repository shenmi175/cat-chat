import React, { useState, useEffect, useRef, useCallback } from 'react';
import ChatBubble from './components/ChatBubble';
import { getSystemState } from './utils/systemMonitor';
import { generateReply } from './utils/deepseek';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [catState, setCatState] = useState('idle'); // idle, happy, thinking
  const lastStateHash = useRef('');
  const lastTriggerReason = useRef(''); // Track the REASON for the last proactive talk
  const prevResponseRef = useRef([]); // Anti-repetition buffer

  // --- Drag: VM & Wayland robust tracking ---
  // In Linux VMs, pointer capture on frameless windows may instantly break.
  // Instead, we track screenX/screenY manually via global mousemove exactly
  // while the mouse is down.
  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return;
    isDragging.current = true;
    lastPos.current = { x: e.screenX, y: e.screenY };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging.current) return;
      
      const dx = e.screenX - lastPos.current.x;
      const dy = e.screenY - lastPos.current.y;
      
      if (dx !== 0 || dy !== 0) {
        window.electronAPI.dragUpdate(dx, dy);
        lastPos.current = { x: e.screenX, y: e.screenY };
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // --- System state polling ---
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const state = await getSystemState();
      if (!state) return;

      // Trigger proactive talk if crucial state changes (App or Charging status)
      const currentStateReason = state.activeApp ? `app:${state.activeApp}` : (state.batteryPercent < 20 ? 'low_battery' : 'normal');
      const stateHash = `${state.activeApp}-${state.isCharging}`;

      if (lastStateHash.current !== stateHash && lastStateHash.current !== '') {
        // Only trigger if the core reason changed (don't repeat "low battery" every 10s)
        // Also skip battery-based triggers if the device has no battery (desktop fix)
        if (currentStateReason !== lastTriggerReason.current) {
           if (!state.hasBattery && currentStateReason === 'low_battery') {
             // Skip low battery alarm on desktops
           } else {
             triggerProactiveTalk(state);
             lastTriggerReason.current = currentStateReason;
           }
        }
      }
      lastStateHash.current = stateHash;
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const extractAndSaveMemories = async (reply) => {
    const memoryRegex = /\[MEMORY:\s*(.*?)\]/g;
    const matches = [...reply.matchAll(memoryRegex)];
    if (matches.length === 0) return reply;

    const newFacts = matches.map(m => m[1].trim());
    const cleanReply = reply.replace(memoryRegex, '').trim();

    // Call atomic append in main process
    await window.electronAPI.appendMemories(newFacts);
    return cleanReply;
  };

  const getUniqueReply = async (prompt, isProactive) => {
    let reply = await generateReply(prompt, isProactive);
    let retryCount = 0;
    while (prevResponseRef.current.includes(reply.trim()) && retryCount < 2) {
      reply = await generateReply(prompt + " (注意：你刚说过类似的词，请换个花样！)", isProactive);
      retryCount++;
    }
    return reply;
  };

  const triggerProactiveTalk = async (systemData) => {
    setIsThinking(true);
    setCatState('thinking');
    try {
      let prompt = `(系统通知：当前时间【${systemData.time}】`;
      if (systemData.hasBattery) {
        prompt += `，所在设备电量【${systemData.batteryPercent}%】`;
      }
      if (systemData.activeApp) {
        prompt += `，主人当前正在使用软件【${systemData.activeApp}】（窗口标题：${systemData.activeWindow}）`;
      }
      prompt += `。这是猫猫自动触发的对话，根据性格主动说一句话。记住：严禁重复你刚说过的话！)`;
      
      const reply = await getUniqueReply(prompt, true);
      const cleanReply = await extractAndSaveMemories(reply);
      addMessage(cleanReply, 'cat');
      
      // Update history buffer
      prevResponseRef.current = [...prevResponseRef.current.slice(-2), cleanReply.trim()];
      
      setCatState('happy');
      setTimeout(() => setCatState('idle'), 5000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSendMessage = async (text) => {
    addMessage(text, 'user');
    setIsThinking(true);
    setCatState('thinking');
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
      addMessage(cleanReply, 'cat');

      // Update history buffer for user chat too
      prevResponseRef.current = [...prevResponseRef.current.slice(-2), cleanReply.trim()];

      setCatState('happy');
    } catch (e) {
      addMessage("呜呜喵...我脑子卡壳了连不上网了...", 'cat');
    } finally {
      setIsThinking(false);
      setTimeout(() => setCatState('idle'), 5000);
    }
  };

  const addMessage = (text, sender) => {
    setMessages(prev => {
      const newLogs = [...prev, { text, sender }];
      return newLogs.slice(-5); // Keep last 5 messages
    });
  };

  return (
    <div className="app-container">
      <div 
        className="cat-area" 
        onMouseDown={handleMouseDown}
      >
        <div className={`cat-body ${catState}`}>
          (=^･ω･^=)
          <div className="ears">/\_/\</div>
          <div className="eyes">o  o</div>
        </div>
      </div>

      <div className="chat-area no-drag">
        <div className="messages-list">
          {messages.map((msg, i) => (
            <ChatBubble key={i} message={msg.text} sender={msg.sender} />
          ))}
        </div>
        {isThinking && (
          <div className="thinking-bubble">正在绞尽脑汁想词...</div>
        )}
      </div>

      <div className="input-area no-drag">
         <form onSubmit={(e) => {
           e.preventDefault();
           if(e.target.msg.value) {
             handleSendMessage(e.target.msg.value);
             e.target.msg.value = '';
           }
         }}>
           <input name="msg" type="text" placeholder="摸摸头并对它说话..." autoComplete="off" />
           <button type="submit">发送</button>
         </form>
      </div>
    </div>
  );
}

export default App;

