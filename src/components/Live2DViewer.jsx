import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

window.PIXI = PIXI;

// Force legacy WebGL to avoid checkMaxIfStatementsInShader crash in Electron
if (PIXI.settings) PIXI.settings.PREFER_ENV = 0;

const CANVAS_W = 320;
const CANVAS_H = 350;

// Auto-fit: scale model so it fills the canvas nicely, regardless of model
function autoFit(model) {
  // pixi-live2d-display gives us the natural pixel size after load
  const natW = model.internalModel?.originalWidth  || model.width  || 1000;
  const natH = model.internalModel?.originalHeight || model.height || 1000;

  // Scale to fill ~90% of the canvas, keeping aspect ratio
  const scale = Math.min(CANVAS_W / natW, CANVAS_H / natH) * 0.9;
  model.scale.set(scale);

  // Position at the bottom-center
  model.anchor.set(0.5, 1);
  model.x = CANVAS_W / 2;
  model.y = CANVAS_H;

  console.log(`Live2D: autoFit  nat=${natW}×${natH}  scale=${scale.toFixed(4)}`);
}

const Live2DViewer = ({ catState, isDragging, modelUrl }) => {
  const containerRef = useRef(null);
  const appRef       = useRef(null);
  const modelRef     = useRef(null);

  const [status,    setStatus]    = React.useState('initializing');
  const [statusMsg, setStatusMsg] = React.useState('');

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    const run = async () => {
      // 1. Cubism Core check
      if (!window.Live2DCubismCore) {
        setStatus('error');
        setStatusMsg('缺少核心驱动!\n请确认 /public/CubismSdkForWeb-5-r.4/Core/live2dcubismcore.min.js 存在');
        return;
      }

      setStatus('loading');
      setStatusMsg('召唤中...');

      // 2. Tear down previous instance
      if (appRef.current) {
        try { appRef.current.destroy(true, { children: true }); } catch (_) {}
        appRef.current = null;
        modelRef.current = null;
      }

      // 3. Create canvas programmatically (prevents CSS vs PIXI size conflict)
      const canvas = document.createElement('canvas');
      canvas.width  = CANVAS_W;
      canvas.height = CANVAS_H;
      // pointer-events: none lets clicks/touches fall through to chat/input below
      canvas.style.cssText =
        `position:absolute;top:0;left:0;width:${CANVAS_W}px;height:${CANVAS_H}px;pointer-events:none;`;
      containerRef.current.appendChild(canvas);

      // 4. Init PixiJS
      let app;
      try {
        app = new PIXI.Application({
          view: canvas,
          width: CANVAS_W,
          height: CANVAS_H,
          backgroundAlpha: 0,
          transparent: true,
          antialias: false,
          autoStart: true,
          resolution: 1,
        });
      } catch (e) {
        canvas.remove();
        if (!cancelled) { setStatus('error'); setStatusMsg(`渲染器初始化失败:\n${e.message}`); }
        return;
      }
      if (cancelled) { app.destroy(true); canvas.remove(); return; }
      appRef.current = app;

      // 5. Load model
      try {
        const model = await Live2DModel.from(modelUrl, { autoInteract: false });
        if (cancelled) { model.destroy(); return; }

        modelRef.current = model;
        app.stage.addChild(model);

        // Auto-fit to canvas — no hardcoded per-model values
        autoFit(model);
        model.interactive = true;

        model.on('pointerdown', () => {
          try { model.motion(modelUrl.includes('katou') ? '' : 'TapBody'); } catch (_) {}
        });

        console.log(`Live2D: model ready  ${modelUrl.split('/').pop()}`);
        if (!cancelled) { setStatus('ready'); setStatusMsg(''); }
      } catch (e) {
        console.error('Live2D: load error', e);
        if (!cancelled) { setStatus('error'); setStatusMsg(`加载失败:\n${e.message ?? '路径错误'}`); }
      }
    };

    run();

    return () => {
      cancelled = true;
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
      if (isDragging)                model.motion('Idle');
      else if (catState === 'happy') model.motion(modelUrl.includes('katou') ? '' : 'TapBody');
      else if (catState === 'thinking') model.motion('Idle');
    } catch (_) {}
  }, [catState, isDragging, modelUrl, status]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: `${CANVAS_W}px`, height: `${CANVAS_H}px` }}
    >
      {status !== 'ready' && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: '#ff8a65', fontSize: '12px', textAlign: 'center',
          padding: '20px', pointerEvents: 'none', zIndex: 10,
          background: status === 'error' ? 'rgba(0,0,0,0.55)' : 'transparent',
          borderRadius: '12px', whiteSpace: 'pre-line',
        }}>
          {status === 'error'
            ? <><div style={{ fontSize: '22px', marginBottom: '8px' }}>😿</div>
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>加载失败</div></>
            : <div style={{ marginBottom: '6px' }}>(=^･ω･^=)</div>
          }
          <div style={{ opacity: 0.9 }}>{statusMsg}</div>
        </div>
      )}
    </div>
  );
};

export default Live2DViewer;
