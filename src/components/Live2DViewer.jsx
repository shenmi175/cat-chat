import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

window.PIXI = PIXI;

// Force legacy WebGL to avoid checkMaxIfStatementsInShader crash in Electron
if (PIXI.settings) PIXI.settings.PREFER_ENV = 0;

const TARGET_MODEL_H = 400; 
const UI_PADDING_H = 150; 

const Live2DViewer = ({ petState, isDragging, modelUrl }) => {
  const containerRef = useRef(null);
  const canvasRef    = useRef(null);
  const appRef       = useRef(null);
  const modelRef     = useRef(null);

  const [status,    setStatus]    = useState('initializing');
  const [statusMsg, setStatusMsg] = useState('');
  const [size,      setSize]      = useState({ w: 350, h: TARGET_MODEL_H + UI_PADDING_H });

  useEffect(() => {
    if (!canvasRef.current || !modelUrl) return;
    
    let cancelled = false;

    const initAndLoad = async () => {
      // 1. Initialize PIXI App once if needed
      if (!appRef.current) {
        const app = new PIXI.Application({
          view: canvasRef.current,
          width: size.w,
          height: size.h,
          backgroundAlpha: 0,
          transparent: true,
          antialias: true,
          autoStart: true,
          resolution: window.devicePixelRatio || 1,
        });
        appRef.current = app;
      }
      
      const app = appRef.current;

      if (!window.Live2DCubismCore) {
        setStatus('error');
        setStatusMsg('缺少核心驱动');
        return;
      }

      setStatus('loading');
      setStatusMsg('变换形态中...');

      // 2. Clean up previous model
      if (modelRef.current) {
        app.stage.removeChild(modelRef.current);
        modelRef.current.destroy();
        modelRef.current = null;
      }

      try {
        const model = await Live2DModel.from(modelUrl, { autoInteract: false });
        if (cancelled) { model.destroy(); return; }

        // Calculate dimensions
        const natW = model.internalModel?.originalWidth  || model.width  || 1000;
        const natH = model.internalModel?.originalHeight || model.height || 1000;
        
        const scale = TARGET_MODEL_H / natH;
        const windowW = Math.max(Math.round(natW * scale), 300);
        const windowH = Math.round(natH * scale) + UI_PADDING_H;
        
        // Update local and Electron state
        setSize({ w: windowW, h: windowH });
        app.renderer.resize(windowW, windowH);
        
        model.scale.set(scale);
        model.anchor.set(0.5, 1);
        model.x = windowW / 2;
        model.y = windowH;

        window.electronAPI.resizeWindow(windowW, windowH);

        app.stage.addChild(model);
        modelRef.current = model;
        model.interactive = true;

        model.on('pointerdown', () => {
          try { model.motion(modelUrl.includes('katou') ? '' : 'TapBody'); } catch (_) {}
        });

        if (!cancelled) { setStatus('ready'); setStatusMsg(''); }
      } catch (e) {
        console.error('Live2D Error:', e);
        if (!cancelled) {
          setStatus('error');
          setStatusMsg(`无法加载角色: ${modelUrl.split('/').pop()}`);
        }
      }
    };

    initAndLoad();

    return () => { cancelled = true; };
  }, [modelUrl]); // Re-run when modelUrl changes

  // Cleanup Pixi App on unmount only
  useEffect(() => {
    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
      if (modelRef.current) {
        modelRef.current.destroy();
        modelRef.current = null;
      }
    };
  }, []);

  // Animation logic
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
      style={{ 
        position: 'relative', 
        width: `${size.w}px`, 
        height: `${size.h}px`,
        transition: 'width 0.3s ease, height 0.3s ease'
      }}
    >
      <canvas 
        ref={canvasRef}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          pointerEvents: 'none' 
        }} 
      />
      {status !== 'ready' && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: '#ff8a65', fontSize: '13px', textAlign: 'center',
          padding: '20px', pointerEvents: 'none', zIndex: 10,
          background: status === 'error' ? 'rgba(0,0,0,0.6)' : 'transparent',
          borderRadius: '16px', backdropFilter: 'blur(4px)'
        }}>
          {status === 'error'
            ? <><div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
                <div style={{ fontWeight: 'bold' }}>模型同步故障</div></>
            : <div style={{ fontWeight: '500' }}>✨ 正在构建形态... ✨</div>
          }
          <div style={{ opacity: 0.8, marginTop: '5px' }}>{statusMsg}</div>
        </div>
      )}
    </div>
  );
};

export default Live2DViewer;
