import React, { useState, useEffect } from 'react';
import './Settings.css';

const MODELS = [
  { value: 'deepseek-chat', label: 'DeepSeek Chat (推荐)' },
  { value: 'deepseek-reasoner', label: 'DeepSeek Reasoner (慢但强)' },
];

function SettingsPage() {
  const [cfg, setCfg] = useState({ apiKey: '', model: 'deepseek-chat', systemPrompt: '' });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    window.electronAPI?.getConfig().then((c) => {
      setCfg(c);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    await window.electronAPI?.saveConfig(cfg);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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
            rows={10}
            value={cfg.systemPrompt}
            onChange={(e) => setCfg({ ...cfg, systemPrompt: e.target.value })}
            placeholder="描述猫猫的性格和行为方式…"
          />
          <p className="settings-hint">修改提示词可以改变猫猫的说话风格和性格特点。</p>
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
