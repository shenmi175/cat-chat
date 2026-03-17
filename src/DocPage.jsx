import React, { useState, useEffect } from 'react';
import './Doc.css';

function DocPage() {
  const [state, setState] = useState(null);

  useEffect(() => {
    const update = async () => {
      const data = await window.electronAPI.getSystemState();
      setState(data);
    };
    update();
    const timer = setInterval(update, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="doc-root">
      <header className="doc-header">
        <span className="doc-icon">📖</span>
        <h1>功能使用说明书</h1>
        <p className="doc-subtitle">了解没头脑猫猫的所有超能力</p>
      </header>

      <main className="doc-body">
        <section className="doc-section sensory-dashboard">
          <h2>👁️ 猫猫的视觉 (实时感知)</h2>
          <p className="sensory-hint">这是猫猫目前察觉到的外界信息（不会持久化）：</p>
          {state ? (
            <div className="sensory-grid">
              <div className="sensory-item">
                <span className="label">正在看:</span>
                <span className="value">{state.activeApp || '桌面'}</span>
              </div>
              <div className="sensory-item">
                <span className="label">窗口名:</span>
                <span className="value">{state.activeWindow || '无'}</span>
              </div>
              {state.hasBattery && (
                <div className="sensory-item">
                  <span className="label">电力值:</span>
                  <span className="value">{state.batteryPercent}% {state.isCharging ? '⚡' : ''}</span>
                </div>
              )}
              <div className="sensory-item">
                <span className="label">时间:</span>
                <span className="value">{state.time}</span>
              </div>
            </div>
          ) : (
            <div className="sensory-loading">正在接入猫猫视角...</div>
          )}
        </section>

        <section className="doc-section">
          <h2>💬 基础交互</h2>
          <p>直接在底部的对话框输入文字即可与猫猫聊天。支持<b>最近 5 句</b>连续对话！</p>
        </section>

        <section className="doc-section">
          <h2>🧠 长期记忆 (小卡片)</h2>
          <p>在<b>设置</b>页面，猫猫会记录<b>关于你的</b>重要信息。它现在只会记录你说的肯定事实，不再记录系统状态或它自己的猜测。</p>
          <ul>
            <li>例如添加：<i>“主人喜欢喝可乐”</i></li>
            <li>猫猫会自动记住这些信息。当你聊到相关话题时，它会引用这些记忆，让对话更贴心。</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>📢 主动搭话（碎碎念）</h2>
          <p>即使你不理它，猫猫也会观察你：</p>
          <ul>
            <li><b>软件监控</b>：当你切换使用的软件（如打开了游戏或浏览器），它可能会跳出来吐槽或奉承。</li>
            <li><b>状态感知</b>：它能感知当前时间。</li>
            <li><b>省电助手</b>：只有笔记本电脑且电量低时它才会提醒，台式机用户不会被虚假警报打扰。</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>🎭 性格定制</h2>
          <p>右键点击猫猫选择<b>“打开设置”</b>：</p>
          <ul>
            <li>你可以修改<b>系统提示词</b>来彻底改变它的灵魂。</li>
            <li>想让它变成高冷御姐？还是满分马屁精？全由你决定。</li>
          </ul>
        </section>

        <section className="doc-section">
          <h2>🖱️ 桌面生存</h2>
          <ul>
            <li><b>拖拽</b>：鼠标左键按住猫猫身体即可在桌面上任意移动。</li>
            <li><b>置顶</b>：它永远会浮动在所有窗口最上层，方便你随时摸摸。</li>
            <li><b>右键菜单</b>：提供设置、文档和退出功能。</li>
          </ul>
        </section>
      </main>

      <footer className="doc-footer">
        <button className="doc-close-btn" onClick={() => window.close()}>关闭文档</button>
      </footer>
    </div>
  );
}

export default DocPage;
