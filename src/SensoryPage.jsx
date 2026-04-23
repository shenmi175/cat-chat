import { useEffect, useState } from 'react';
import './Sensory.css';

function SensoryPage() {
  const [sysState, setSysState] = useState(null);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const state = await window.electronAPI.getSystemState();
        if (state) setSysState(state);
      } catch (err) {
        console.error('Failed to fetch system state:', err);
      }
    };
    fetchState();
    const timer = setInterval(fetchState, 5000);
    return () => clearInterval(timer);
  }, []);

  const getFallbackText = (val) => {
    if (val && val.trim() !== '') return val;
    return <span className="fallback-text">未知 (可能受限于桌面环境或权限)</span>;
  };

  return (
    <div className="sensory-root">
      <header className="sensory-header glass-panel">
        <div className="sensory-logo">👁️</div>
        <div className="sensory-title-group">
          <h1>感知中心</h1>
          <p>实时观察桌面上正在发生的一切</p>
        </div>
      </header>

      <div className="sensory-body fade-in">
        <section className="sensory-dashboard glass-panel">
          <div className="sensory-grid">
            <div className="sensory-item">
              <span className="label">当前软件/进程</span>
              <span className="value">{getFallbackText(sysState?.activeApp)}</span>
            </div>
            <div className="sensory-item">
              <span className="label">窗口标题</span>
              <span className="value">{getFallbackText(sysState?.activeWindow)}</span>
            </div>
            <div className="sensory-item">
              <span className="label">系统电量</span>
              <span className="value battery">
                {sysState?.hasBattery ? `${sysState.batteryPercent}% ${sysState.isCharging ? '⚡' : ''}` : '台式机/无需电池'}
              </span>
            </div>
            <div className="sensory-item">
              <span className="label">本地时间</span>
              <span className="value time">{sysState?.time || '--:--:--'}</span>
            </div>
          </div>
        </section>

        <section className="sensory-tips glass-panel">
          <h3>💡 为什么会有“未知”？</h3>
          <p>
            如果显示为“未知”，是因为它缺乏获取屏幕信息的系统级权限，或者您正处于 <b>Linux Wayland</b> 等安全机制较高的显示服务中，它们默认阻止了跨窗口的数据拉取！
          </p>
        </section>
      </div>

      <footer className="sensory-footer">
        <button className="sensory-close-btn pulse" onClick={() => window.close()}>
          关闭感知
        </button>
      </footer>
    </div>
  );
}

export default SensoryPage;
