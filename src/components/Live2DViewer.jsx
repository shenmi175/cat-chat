import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

window.PIXI = PIXI;

// Force legacy WebGL to avoid checkMaxIfStatementsInShader crash in Electron
if (PIXI.settings) PIXI.settings.PREFER_ENV = 0;

// Target display height for the MODEL itself (not the whole window)
const TARGET_MODEL_H = 400; 
// Vertical padding for chat and input UI (at the top)
const UI_PADDING_H = 150; 

const Live2DViewer = ({ petState, isDragging, modelUrl }) => {
  const containerRef = useRef(null);
  const appRef       = useRef(null);
  const modelRef     = useRef(null);

  const [status,    setStatus]    = useState('initializing');
  const [statusMsg, setStatusMsg] = useState('');
  const [size,      setSize]      = useState({ w: 400, h: TARGET_MODEL_H + UI_PADDING_H });

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    const run = async () => {
      if (!window.Live2DCubismCore) {
        setStatus('error');
        setStatusMsg('缺少核心驱动!\n请确认 /public/CubismSdkForWeb-5-r.4/Core/live2dcubismcore.min.js 存在');
        return;
      }

      setStatus('loading');
      setStatusMsg('正在连接次元...');

      if (appRef.current) {
        try { appRef.current.destroy(true, { children: true }); } catch (_) {}
        appRef.current = null;
        modelRef.current = null;
      }

      try {
        const model = await Live2DModel.from(modelUrl, { autoInteract: false });
        if (cancelled) { model.destroy(); return; }

        // Calculate dynamic dimensions
        const natW = model.internalModel?.originalWidth  || model.width  || 1000;
        const natH = model.internalModel?.originalHeight || model.height || 1000;
        
        // Scale so model height is exactly TARGET_MODEL_H
        const scale = TARGET_MODEL_H / natH;
        const displayW = Math.round(natW * scale);
        const displayH = Math.round(natH * scale);
        
        // Window size: Model Width x (Model Height + UI space)
        const windowW = Math.max(displayW, 300); // Minimum width for safety
        const windowH = displayH + UI_PADDING_H;
        
        setSize({ w: windowW, h: windowH });
        model.scale.set(scale);
        model.anchor.set(0.5, 1);
        model.x = windowW / 2;
        model.y = windowH;

        // Tell Electron to resize
        window.electronAPI.resizeWindow(windowW, windowH);

        // Create Pixi App
        const canvas = document.createElement('canvas');
        canvas.width  = windowW;
        canvas.height = windowH;
        canvas.style.cssText = `position:absolute;top:0;left:0;width:${windowW}px;height:${windowH}px;pointer-events:none;`;
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(canvas);

        const app = new PIXI.Application({
          view: canvas,
          width: windowW,
          height: windowH,
          backgroundAlpha: 0,
          transparent: true,
          antialias: true,
          autoStart: true,
          resolution: window.devicePixelRatio || 1,
        });
        
        appRef.current = app;
        modelRef.current = model;
        app.stage.addChild(model);
        model.interactive = true;

        model.on('pointerdown', () => {
          try { model.motion(modelUrl.includes('katou') ? '' : 'TapBody'); } catch (_) {}
        });

        if (!cancelled) { setStatus('ready'); setStatusMsg(''); }
      } catch (e) {
        console.error('Live2D: load error', e);
        if (!cancelled) { setStatus('error'); setStatusMsg(`加载失败:\n${e.message ?? '路径错误'}`); }
      }
    };

    run();

    return () => {
      cancelled = true;
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
      else if (petState === 'happy') model.motion(modelUrl.includes('katou') ? '' : 'TapBody');
      else if (petState === 'thinking') model.motion('Idle');
    } catch (_) {}
  }, [petState, isDragging, modelUrl, status]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: `${size.w}px`, height: `${size.h}px` }}
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
                <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>召唤失败</div></>
            : <div style={{ marginBottom: '6px' }}>✨ 正在穿越位面... ✨</div>
          }
          <div style={{ opacity: 0.9 }}>{statusMsg}</div>
        </div>
      )}
    </div>
  );
};

export default Live2DViewer;
