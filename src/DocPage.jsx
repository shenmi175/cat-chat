import React from 'react';
import './Doc.css';

function DocPage() {
  return (
    <div className="doc-root">
      <header className="doc-header">
        <span className="doc-icon">📖</span>
        <h1>功能使用说明书</h1>
        <p className="doc-subtitle">了解没头脑猫猫的所有超能力</p>
      </header>

      <main className="doc-body">
        <section className="doc-section">
          <h2>💬 基础交互</h2>
          <p>直接在底部的对话框输入文字即可与猫猫聊天。它会根据你的话语和目前的系统状态（时间、正在用的软件等）来回复你。</p>
        </section>

        <section className="doc-section">
          <h2>🧠 长期记忆（小卡片）</h2>
          <p>在<b>设置</b>页面，你可以给猫猫添加“记忆卡片”。</p>
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
