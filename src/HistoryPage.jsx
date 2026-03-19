import React, { useState, useEffect } from 'react';
import './History.css';

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      const cfg = await window.electronAPI.getConfig();
      setHistory(cfg.chatHistory || []);
      setLoading(false);
    };
    fetchHistory();

    // Live update if the window is open
    const cleanup = window.electronAPI.onConfigUpdated((newCfg) => {
      setHistory(newCfg.chatHistory || []);
    });
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  if (loading) return <div className="history-loading">调取时光机档案中...</div>;

  return (
    <div className="history-root">
      <header className="history-header">
        <span className="history-icon">📜</span>
        <h1>时光档案卷轴</h1>
        <p className="history-subtitle">记录你与它共同度过的每一秒</p>
      </header>

      <div className="history-list">
        {history.length === 0 ? (
          <div className="no-history">还没有留下任何足迹...</div>
        ) : (
          history.map((msg, i) => (
            <div key={i} className={`history-item ${msg.sender === 'user' ? 'user' : 'pet'}`}>
              <div className="history-avatar">
                {msg.sender === 'user' ? '👤' : '✨'}
              </div>
              <div className="history-bubble-wrap">
                <div className="history-bubble">
                  {msg.text}
                </div>
                <span className="history-time">{msg.time}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <footer className="history-footer">
        <button className="history-close-btn pulse" onClick={() => window.close()}>合上卷轴</button>
      </footer>

    </div>
  );
}

export default HistoryPage;
