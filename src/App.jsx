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

      const stateHash = `${state.activeApp}-${state.isCharging}`;
      if (lastStateHash.current !== stateHash && lastStateHash.current !== '') {
        triggerProactiveTalk(state);
      }
      lastStateHash.current = stateHash;
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const triggerProactiveTalk = async (systemData) => {
    setIsThinking(true);
    setCatState('thinking');
    try {
      const prompt = `当前时间【${systemData.time}】，所在设备电量【${systemData.batteryPercent}%】。请你主动找个理由拍马屁或者惊讶地吐槽一下！`;
      const reply = await generateReply(prompt, true);
      addMessage(reply, 'cat');
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
      const stateContext = systemData ? `(当前时间:${systemData.time})` : '';
      const prompt = `主人对你说：${text}。当前系统状态：${stateContext}。快奉承主人吧！`;
      const reply = await generateReply(prompt, false);
      addMessage(reply, 'cat');
      setCatState('happy');
    } catch (e) {
      addMessage("呜呜喵...我脑子卡壳了连不上网了...", 'cat');
    } finally {
      setIsThinking(false);
      setTimeout(() => setCatState('idle'), 5000);
    }
  };

  const addMessage = (text, sender) => {
    setMessages([{ text, sender }]);
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
        {messages.length > 0 && (
          <ChatBubble message={messages[0].text} sender={messages[0].sender} />
        )}
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

