import React, { useState, useEffect } from 'react';
import './Settings.css';

const MODELS = [
  { value: 'deepseek-chat', label: 'DeepSeek Chat (推荐)' },
  { value: 'deepseek-reasoner', label: 'DeepSeek Reasoner (慢但强)' },
];

function SettingsPage() {
  const [cfg, setCfg] = useState({ 
    apiKey: '', 
    model: 'deepseek-chat', 
    systemPrompt: '', 
    memories: [] 
  });
  const [activeTab, setActiveTab] = useState('general'); // 'general' or 'memory'
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showKey, setShowKey] = useState(false);
  const [newMemory, setNewMemory] = useState('');

  useEffect(() => {
    window.electronAPI?.getConfig().then((c) => {
      if (c) setCfg(c);
      setLoading(false);
    });

    const cleanup = window.electronAPI?.onConfigUpdated((newCfg) => {
      if (newCfg) setCfg(newCfg);
    });
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, []);

  const handleSave = async () => {
    await window.electronAPI?.saveConfig(cfg);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addMemory = () => {
    if (!newMemory.trim()) return;
    const now = new Date();
    const timeStr = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const newEntry = { text: newMemory.trim(), time: timeStr };
    setCfg({ ...cfg, memories: [...(cfg.memories || []), newEntry] });
    setNewMemory('');
  };

  const removeMemory = (index) => {
    const newMems = [...(cfg.memories || [])];
    newMems.splice(index, 1);
    setCfg({ ...cfg, memories: newMems });
  };

  if (loading) return <div className="settings-loading">调取配置中心...</div>;

  return (
    <div className="settings-root">
      <aside className="settings-sidebar glass-panel">
        <div className="sidebar-header">
          <span className="sidebar-cat">🐱</span>
          <h2>猫猫控制台</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            ⚙️ 通用配置
          </button>
          <button 
            className={`nav-item ${activeTab === 'memory' ? 'active' : ''}`}
            onClick={() => setActiveTab('memory')}
          >
            🧠 记忆库管理
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="settings-save-btn" onClick={handleSave}>
            {saved ? '✅ 已保存' : '💾 保存所有'}
          </button>
        </div>
      </aside>

      <main className="settings-content">
        {activeTab === 'general' ? (
          <div className="content-pane fade-in">
            <header className="content-header">
              <h1>通用配置</h1>
              <p>调整 AI 大脑的核心参数</p>
            </header>
            
            <section className="settings-section glass-card">
              <label className="settings-label">DeepSeek API Key</label>
              <div className="settings-input-row">
                <input
                  className="settings-input"
                  type={showKey ? 'text' : 'password'}
                  value={cfg.apiKey || ''}
                  onChange={(e) => setCfg({ ...cfg, apiKey: e.target.value })}
                  placeholder="请输入您的 sk-..."
                />
                <button className="settings-toggle-btn" onClick={() => setShowKey(!showKey)}>
                  {showKey ? '🙈' : '👁️'}
                </button>
              </div>
            </section>

            <section className="settings-section glass-card">
              <label className="settings-label">思考模型</label>
              <select
                className="settings-select"
                value={cfg.model || 'deepseek-chat'}
                onChange={(e) => setCfg({ ...cfg, model: e.target.value })}
              >
                {MODELS.map(m => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
            </section>

            <section className="settings-section glass-card">
              <label className="settings-label">性格与行为准则</label>
              <textarea
                className="settings-textarea"
                rows={8}
                value={cfg.systemPrompt || ''}
                onChange={(e) => setCfg({ ...cfg, systemPrompt: e.target.value })}
                placeholder="它该是一只什么样的猫？"
              />
            </section>
          </div>
        ) : (
          <div className="content-pane fade-in">
            <header className="content-header">
              <h1>记忆库管理</h1>
              <p>这里存放着猫猫记下的关于你的一切</p>
            </header>

            <div className="settings-section glass-card">
              <div className="memory-input-row">
                <input
                  className="settings-input"
                  value={newMemory}
                  onChange={(e) => setNewMemory(e.target.value)}
                  placeholder="手动添加一条记忆..."
                  onKeyDown={(e) => e.key === 'Enter' && addMemory()}
                />
                <button className="memory-add-btn" onClick={addMemory}>添加</button>
              </div>
              <div className="memory-grid">
                {(cfg.memories || []).length > 0 ? (
                  cfg.memories.map((mem, i) => {
                    const isObj = typeof mem === 'object' && mem !== null;
                    const text = isObj ? mem.text : mem;
                    const time = isObj ? mem.time : '';
                    return (
                      <div key={i} className="memory-card">
                        <div className="memory-card-body">
                          <span className="memory-text">{text}</span>
                          {time && <span className="memory-time">{time}</span>}
                        </div>
                        <button className="memory-card-del" onClick={() => removeMemory(i)}>×</button>
                      </div>
                    );
                  })
                ) : (
                  <div className="no-memories">它暂时还没记住任何事情喵~</div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SettingsPage;
