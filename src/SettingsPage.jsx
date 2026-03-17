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
    setCfg({ ...cfg, memories: newMems });
  };

  if (loading) return <div className="settings-loading">加载配置中…</div>;

  return (
    <div className="settings-root">
      <header className="settings-header">
        <span className="settings-icon">🐱</span>
        <h1>猫猫配置中心</h1>
        <p className="settings-subtitle">配置 AI 模型和猫猫的性格</p>
      </header>

      <div className="settings-body">
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
              title={showKey ? '隐藏' : '显示'}
            >
              {showKey ? '🙈' : '👁️'}
            </button>
          </div>
          <p className="settings-hint">
            前往 <a href="#" onClick={() => window.open('https://platform.deepseek.com')}>platform.deepseek.com</a> 获取 API Key
          </p>
        </section>

        {/* Model */}
        <section className="settings-section">
          <label className="settings-label">模型</label>
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
          <label className="settings-label">系统提示词（猫猫的性格）</label>
          <textarea
            className="settings-textarea"
            rows={5}
            value={cfg.systemPrompt}
            onChange={(e) => setCfg({ ...cfg, systemPrompt: e.target.value })}
            placeholder="描述猫猫的性格 and 行为方式…"
          />
          <p className="settings-hint">修改提示词可以改变猫猫的说话风格和性格特点。</p>
        </section>

        {/* Memory Library */}
        <section className="settings-section">
          <label className="settings-label">猫猫的记忆库（小卡片）</label>
          <div className="memory-input-row">
            <input
              className="settings-input"
              value={newMemory}
              onChange={(e) => setNewMemory(e.target.value)}
              placeholder="例如：主人喜欢的食物是可乐..."
              onKeyDown={(e) => e.key === 'Enter' && addMemory()}
            />
            <button className="settings-toggle-btn" onClick={addMemory}>➕ 添加</button>
          </div>
          <div className="memory-list">
            {(cfg.memories || []).map((mem, i) => {
              // Handle both legacy string and new object structure
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
            })}
          </div>
          <p className="settings-hint">猫猫会记住这些信息，并在聊天中引用它们。</p>
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
