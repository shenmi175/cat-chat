import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

// pixi-live2d-display requires PIXI on window
window.PIXI = PIXI;

// ─── Force most compatible WebGL mode ─────────────────────────────────────────
// PIXI.ENV: WEBGL_LEGACY=0, WEBGL=1, WEBGL2=2
// Use 0 (legacy) to avoid checkMaxIfStatementsInShader crash in Electron
if (PIXI.settings) {
  PIXI.settings.PREFER_ENV = 0; // WEBGL_LEGACY
}

// ─── Model scale table ────────────────────────────────────────────────────────
function getScale(url) {
  if (url.includes('Wanko'))  return 0.30;
  if (url.includes('Rice'))   return 0.35;
  if (url.includes('katou'))  return 0.11;
  // Haru, Hiyori, Mao, Mark, Natori — full-body humans
  return 0.09;
}

// ─── Component ────────────────────────────────────────────────────────────────
const Live2DViewer = ({ catState, isDragging, modelUrl }) => {
  const containerRef = useRef(null);    // The outer div
  const appRef      = useRef(null);
  const modelRef    = useRef(null);

  const [status, setStatus] = React.useState('initializing'); // 'initializing' | 'loading' | 'ready' | 'error'
  const [statusMsg, setStatusMsg] = React.useState('检查驱动...');

  // Single effect: init PIXI + load model.  Runs whenever modelUrl changes.
  useEffect(() => {
    if (!containerRef.current) return;

    let cancelled = false;

    const run = async () => {
      // ── 1. Check Cubism Core ──────────────────────────────────────────────
      if (!window.Live2DCubismCore) {
        setStatus('error');
        setStatusMsg('缺少核心驱动!\\n请确认 index.html 中的 Cubism Core 脚本已正确加载。\\n检查开发者控制台 (F12) 的 Network 标签页。');
        return;
      }
      setStatus('loading');
      setStatusMsg(`加载模型中...\\n${modelUrl.split('/').pop()}`);

      // ── 2. Destroy previous PIXI app ─────────────────────────────────────
      if (appRef.current) {
        try { appRef.current.destroy(true, { children: true }); } catch (_) {}
        appRef.current = null;
        modelRef.current = null;
      }

      // ── 3. Create canvas programmatically (avoid CSS size conflicts) ──────
      const canvas = document.createElement('canvas');
      canvas.width  = 300;
      canvas.height = 300;
      canvas.style.cssText = 'position:absolute;top:0;left:0;cursor:pointer;';
      containerRef.current.appendChild(canvas);

      // ── 4. Init PIXI ──────────────────────────────────────────────────────
      let app;
      try {
        app = new PIXI.Application({
          view: canvas,
          width: 300,
          height: 300,
          backgroundAlpha: 0,
          transparent: true,
          antialias: false,          // false = more compatible
          autoStart: true,
          resolution: 1,             // fixed 1x avoids density math issues
          forceCanvas: false,
        });
      } catch (e) {
        console.error('Live2D: PIXI init failed', e);
        canvas.remove();
        if (!cancelled) {
          setStatus('error');
          setStatusMsg(`渲染器初始化失败: ${e.message}`);
        }
        return;
      }

      if (cancelled) { app.destroy(true); canvas.remove(); return; }
      appRef.current = app;
      console.log('Live2D: PIXI ready, renderer=', app.renderer.type === 1 ? 'WebGL' : 'Canvas');

      // ── 5. Load model ─────────────────────────────────────────────────────
      try {
        const model = await Live2DModel.from(modelUrl, { autoInteract: false });
        if (cancelled) { model.destroy(); return; }

        modelRef.current = model;
        app.stage.addChild(model);

        const sc = getScale(modelUrl);
        model.scale.set(sc);
        model.anchor.set(0.5, 0.5);
        model.x = 150;
        model.y = 150;
        model.interactive = true;

        model.on('pointerdown', () => {
          try { model.motion(modelUrl.includes('katou') ? '' : 'TapBody'); } catch (_) {}
        });

        console.log(`Live2D: Model ready  scale=${sc}  url=${modelUrl}`);
        if (!cancelled) { setStatus('ready'); setStatusMsg(''); }

      } catch (e) {
        console.error('Live2D: model load error', e);
        if (!cancelled) {
          setStatus('error');
          setStatusMsg(`模型加载失败: ${e.message ?? '路径可能不正确'}`);
        }
      }
    };

    run();

    return () => {
      cancelled = true;
      // Remove dynamically-created canvas
      const canvas = containerRef.current?.querySelector('canvas');
      if (canvas) canvas.remove();
      if (appRef.current) {
        try { appRef.current.destroy(true, { children: true }); } catch (_) {}
        appRef.current = null;
      }
      modelRef.current = null;
    };
  }, [modelUrl]);

  // Animate on state change
  useEffect(() => {
    const model = modelRef.current;
    if (!model || status !== 'ready') return;
    try {
      if (isDragging)           model.motion('Idle');
      else if (catState === 'happy')    model.motion(modelUrl.includes('katou') ? '' : 'TapBody');
      else if (catState === 'thinking') model.motion('Idle');
    } catch (_) {}
  }, [catState, isDragging, modelUrl, status]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '300px', height: '300px', overflow: 'hidden' }}
    >
      {/* Status overlay — visible when not ready */}
      {status !== 'ready' && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: '#ff8a65', fontSize: '12px', textAlign: 'center',
          padding: '20px', pointerEvents: 'none', zIndex: 10,
          background: status === 'error' ? 'rgba(0,0,0,0.55)' : 'transparent',
          borderRadius: '12px',
          whiteSpace: 'pre-line',
        }}>
          {status === 'error'
            ? <><div style={{ fontSize: '24px', marginBottom: '8px' }}>😿</div><div style={{ fontWeight: 'bold', marginBottom: '6px' }}>加载失败</div></>
            : <div style={{ marginBottom: '6px' }}>(=^･ω･^=)</div>
          }
          <div style={{ opacity: 0.9 }}>{statusMsg}</div>
        </div>
      )}
    </div>
  );
};

export default Live2DViewer;
