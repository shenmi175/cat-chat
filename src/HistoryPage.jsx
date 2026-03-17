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
  }, []);

  if (loading) return <div className="history-loading">调取时光机档案中...</div>;

  return (
    <div className="history-root">
      <header className="history-header">
        <span className="history-icon">📜</span>
        <h1>对话历史记录</h1>
        <p className="history-subtitle">最近 15 次跨时空交流</p>
      </header>

      <div className="history-list">
        {history.length === 0 ? (
          <div className="no-history">还没有任何对话记录喵~</div>
        ) : (
          history.map((msg, i) => (
            <div key={i} className={`history-item ${msg.sender}`}>
              <div className="history-avatar">
                {msg.sender === 'cat' ? '🐱' : '👤'}
              </div>
              <div className="history-bubble-wrap">
                <div className="history-bubble">{msg.text}</div>
                <div className="history-time">{msg.time}</div>
              </div>
            </div>
          ))
        )}
      </div>

      <footer className="history-footer">
        <button className="history-close-btn" onClick={() => window.close()}>合上卷轴</button>
      </footer>
    </div>
  );
}

export default HistoryPage;
