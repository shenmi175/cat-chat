import React, { useState, useEffect } from 'react';
import './Settings.css';
import DocPage from './DocPage.jsx';
import HistoryPage from './HistoryPage.jsx';
import SensoryPage from './SensoryPage.jsx';

const MODELS = [
  { value: 'deepseek-chat', label: 'DeepSeek Chat (推荐)' },
  { value: 'deepseek-reasoner', label: 'DeepSeek Reasoner (慢但强)' },
];

const MODELS_L2D = [
  { name: 'Wanko (小狗 - 推荐测试)', url: '/CubismSdkForWeb-5-r.4/Samples/Resources/Wanko/Wanko.model3.json' },
  { name: 'Rice (小精灵)', url: '/CubismSdkForWeb-5-r.4/Samples/Resources/Rice/Rice.model3.json' },
  { name: 'Haru (少女)', url: '/CubismSdkForWeb-5-r.4/Samples/Resources/Haru/Haru.model3.json' },
  { name: 'Hiyori (日和)', url: '/CubismSdkForWeb-5-r.4/Samples/Resources/Hiyori/Hiyori.model3.json' },
  { name: 'Mao (茂)', url: '/CubismSdkForWeb-5-r.4/Samples/Resources/Mao/Mao.model3.json' },
  { name: 'Natori (名取)', url: '/CubismSdkForWeb-5-r.4/Samples/Resources/Natori/Natori.model3.json' },
  { name: 'Mark (男)', url: '/CubismSdkForWeb-5-r.4/Samples/Resources/Mark/Mark.model3.json' },
  { name: '加藤惠 (Katou Megumi - v2)', url: '/model/katou_01/katou_01.model.json' },
];

function SettingsPage() {
  const [cfg, setCfg] = useState({});
  const [loading, setLoading] = useState(true);
  
  // Set initial tab from window hash, default to 'general'
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#', '');
    return ['general', 'memory', 'history', 'sensory', 'doc'].includes(hash) ? hash : 'general';
  };
  const [activeTab, setActiveTab] = useState(getInitialTab);

  useEffect(() => {
    const handleHashChange = () => {
      setActiveTab(getInitialTab());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  const [saved, setSaved] = useState(false);
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
              className={`sidebar-item ${activeTab === 'general' ? 'active' : ''}`}
              onClick={() => { setActiveTab('general'); window.location.hash = 'general'; }}
            >
              <span className="icon">⚙️</span> 通用配置
            </button>
            <button
              className={`sidebar-item ${activeTab === 'memory' ? 'active' : ''}`}
              onClick={() => { setActiveTab('memory'); window.location.hash = 'memory'; }}
            >
              <span className="icon">🧠</span> 记忆库管理
            </button>
            <button
              className={`sidebar-item ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => { setActiveTab('history'); window.location.hash = 'history'; }}
            >
              <span className="icon">📝</span> 对话历史
            </button>
            <button
              className={`sidebar-item ${activeTab === 'sensory' ? 'active' : ''}`}
              onClick={() => { setActiveTab('sensory'); window.location.hash = 'sensory'; }}
            >
              <span className="icon">👁️</span> 感知中心
            </button>
            <button
              className={`sidebar-item ${activeTab === 'doc' ? 'active' : ''}`}
              onClick={() => { setActiveTab('doc'); window.location.hash = 'doc'; }}
            >
              <span className="icon">📖</span> 功能文档
            </button>
        </nav>
        <div className="sidebar-footer">
          <button className="settings-save-btn" onClick={handleSave}>
            {saved ? '✅ 已保存' : '💾 保存所有'}
          </button>
        </div>
      </aside>

      <main className="settings-content">
        {activeTab === 'general' && (
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
              <label className="settings-label">应用看板娘/宠物选择</label>
              <select
                className="settings-select"
                value={cfg.modelUrl || ''}
                onChange={(e) => {
                  const selected = MODELS_L2D.find(m => m.url === e.target.value);
                  if (selected) {
                    setCfg({ ...cfg, modelUrl: selected.url, modelName: selected.name });
                  }
                }}
              >
                {MODELS_L2D.map(m => (
                  <option key={m.url} value={m.url}>{m.name}</option>
                ))}
              </select>
              <p style={{ fontSize: '12px', opacity: 0.6, marginTop: '8px' }}>
                切换后点击“保存所有”并重启应用或等待猫猫重载。
              </p>
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
        )}

        {activeTab === 'memory' && (
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

        {/* Embedded Pages */}
        {activeTab === 'history' && (
          <div className="embedded-page">
            <HistoryPage />
          </div>
        )}

        {activeTab === 'sensory' && (
          <div className="embedded-page">
            <SensoryPage />
          </div>
        )}

        {activeTab === 'doc' && (
          <div className="embedded-page">
            <DocPage />
          </div>
        )}
      </main>
    </div>
  );
}

export default SettingsPage;
