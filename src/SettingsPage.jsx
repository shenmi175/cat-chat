import React, { useState, useEffect } from 'react';
import './Settings.css';

const MODELS = [
  { value: 'deepseek-chat', label: 'DeepSeek Chat (推荐)' },
  { value: 'deepseek-reasoner', label: 'DeepSeek Reasoner (慢但强)' },
];

function SettingsPage() {
  const [cfg, setCfg] = useState({ apiKey: '', model: 'deepseek-chat', systemPrompt: '', memories: [] });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showKey, setShowKey] = useState(false);
  const [newMemory, setNewMemory] = useState('');

  useEffect(() => {
    window.electronAPI?.getConfig().then((c) => {
      setCfg(c);
      setLoading(false);
    });

    // Listen for background updates (e.g. AI auto-extracting memories)
    const cleanup = window.electronAPI?.onConfigUpdated((newCfg) => {
      setCfg(newCfg);
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
    
    const newEntry = {
      text: newMemory.trim(),
      time: timeStr
    };
    
    setCfg({ ...cfg, memories: [...(cfg.memories || []), newEntry] });
    setNewMemory('');
  };

  const removeMemory = (index) => {
    const newMems = [...(cfg.memories || [])];
    newMems.splice(index, 1);
    setCfg({ ...cfg, memories: newMems   const [activeTab, setActiveTab] = useState('general'); // 'general' or 'memory'

  if (loading) return <div className="settings-loading">加载配置中…</div>;

  return (
    <div className="settings-root">
      <aside className="settings-sidebar">
        <div className="sidebar-header">
          <span className="sidebar-logo">🐱</span>
          <h3>猫猫控制台</h3>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <span className="nav-icon">⚙️</span> 基础配置
          </button>
          <button 
            className={`nav-item ${activeTab === 'memory' ? 'active' : ''}`}
            onClick={() => setActiveTab('memory')}
          >
            <span className="nav-icon">🧠</span> 记忆档案
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="settings-save-btn" onClick={handleSave}>
            {saved ? '✅ 已保存' : '💾 保存设置'}
          </button>
        </div>
      </aside>

      <main className="settings-main">
        <header className="settings-content-header">
          <h1>{activeTab === 'general' ? '基础配置' : '记忆档案库'}</h1>
          <p>{activeTab === 'general' ? '配置 AI 模型和猫猫的性格' : '管理猫猫记下的关于主人的点点滴滴'}</p>
        </header>

        <div className="settings-body">
          {activeTab === 'general' && (
            <>
              {/* API Key */}
              <section className="settings-section">
                <label className="settings-label">DeepSeek API Key</label>
                <div className="settings-input-row">
                  <input
                    className="settings-input"
                    type={showKey ? 'text' : 'password'}
                    value={cfg.apiKey}
                    placeholder="sk-xxxxxxxxxxxxxxxx"
                    onChange={(e) => setCfg({ ...cfg, apiKey: e.target.value })}
                  />
                  <button
                    className="settings-toggle-btn"
                    onClick={() => setShowKey((v) => !v)}
                  >
                    {showKey ? '🙈' : '👁️'}
                  </button>
                </div>
                <p className="settings-hint">
                  前往 <a href="#" onClick={() => window.open('https://platform.deepseek.com')}>platform.deepseek.com</a> 获取
                </p>
              </section>

              {/* Model */}
              <section className="settings-section">
                <label className="settings-label">对话模型</label>
                <select
                  className="settings-select"
                  value={cfg.model}
                  onChange={(e) => setCfg({ ...cfg, model: e.target.value })}
                >
                  {MODELS.map((m) => (
                    <option key={m.value} value={m.value}>{m.label}</option>
                  ))}
                </select>
              </section>

              {/* System Prompt */}
              <section className="settings-section">
                <label className="settings-label">人格预设 (System Prompt)</label>
                <textarea
                  className="settings-textarea"
                  rows={8}
                  value={cfg.systemPrompt}
                  onChange={(e) => setCfg({ ...cfg, systemPrompt: e.target.value })}
                  placeholder="描述猫猫的性格 and 行为方式…"
                />
              </section>
            </>
          )}

          {activeTab === 'memory' && (
            <section className="settings-section full-height">
              <label className="settings-label">录入新记忆</label>
              <div className="memory-input-row">
                <input
                  className="settings-input"
                  value={newMemory}
                  onChange={(e) => setNewMemory(e.target.value)}
                  placeholder="例如：主人喜欢的食物是小番茄..."
                  onKeyDown={(e) => e.key === 'Enter' && addMemory()}
                />
                <button className="settings-toggle-btn" onClick={addMemory}>➕ 添加</button>
              </div>
              
              <div className="memory-scroll-area">
                <div className="memory-list">
                  {(cfg.memories || []).length === 0 ? (
                    <div className="empty-memory">暂无记忆，多跟我聊天试试喵~</div>
                  ) : (
                    (cfg.memories || []).map((mem, i) => {
                      const isObj = typeof mem === 'object' && mem !== null;
                      const text = isObj ? mem.text : mem;
                      const time = isObj ? mem.time : '';
                      return (
                        <div key={i} className="memory-item">
                          <div className="memory-content">
                            <span className="memory-text">{text}</span>
                            {time && <span className="memory-time">{time}</span>}
                          </div>
                          <button className="memory-delete-btn" onClick={() => removeMemory(i)}>×</button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
�并在聊天中引用它们。</p>
        </section>
      </div>

      <footer className="settings-footer">
        <button className="settings-save-btn" onClick={handleSave}>
          {saved ? '✅ 已保存！' : '💾 保存设置'}
        </button>
      </footer>
    </div>
  );
}

export default SettingsPage;
