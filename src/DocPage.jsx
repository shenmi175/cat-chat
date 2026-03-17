import React, { useState, useEffect } from 'react';
import './Doc.css';

function DocPage() {

  return (
    <div className="doc-root">
      <header className="doc-header glass-panel">
        <div className="doc-logo">👁️</div>
        <div className="doc-title-group">
          <h1>猫猫感知中心</h1>
          <p>实时观察桌面上正在发生的一切</p>
        </div>
      </header>

      <div className="doc-body">

        {/* Feature Grid */}
        <div className="feature-grid">
          <div className="feature-card glass-card">
            <h3>💬 实时唠叨</h3>
            <p>只要你切换软件、电量变动或者它心血来潮，猫猫都会蹦出来对你<b>“马屁不停”</b>。</p>
          </div>
          
          <div className="feature-card glass-card">
            <h3>🎨 颜值模式</h3>
            <p>你可以让它进入<b>“发呆、思考、开心”</b>等状态，它的表情包会随之变化。</p>
          </div>

          <div className="feature-card glass-card">
            <h3>🧠 自主记忆</h3>
            <p>它会自动记住你提到的名字、饮食喜好等。这些记忆可以在<b>设置-记忆库</b>里手动维护喵！</p>
          </div>

          <div className="feature-card glass-card">
            <h3>📜 时光回溯</h3>
            <p>右键菜单打开<b>“对话记录”</b>，可以回看最近 15 次的跨次元交流档案。</p>
          </div>
        </div>

        <section className="doc-tips glass-panel">
          <h3>💡 小贴士</h3>
          <p>猫猫累了？右键点击它，选择<b>“退出”</b>即可让它回猫星休息喵！</p>
        </section>
      </div>

      <footer className="doc-footer">
        <button className="doc-close-btn pulse" onClick={() => window.close()}>
          合上卷轴
        </button>
      </footer>
    </div>
  );
}

export default DocPage;
