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
    if (!canvasRef.current || !modelUrl) {
       console.warn('Live2D: Missing canvas or modelUrl', { hasCanvas: !!canvasRef.current, modelUrl });
       return;
    }
    
    let cancelled = false;

    const initAndLoad = async () => {
      console.log('Live2D: Starting initAndLoad for', modelUrl);
      
      // 1. Initialize PIXI App once if needed
      if (!appRef.current) {
        console.log('Live2D: Creating new PIXI.Application');
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
        console.error('Live2D: Missing Cubism Core');
        return;
      }

      setStatus('loading');
      setStatusMsg('正在构筑形态...');

      // 2. Clean up previous model
      if (modelRef.current) {
        console.log('Live2D: Cleaning up old model');
        app.stage.removeChild(modelRef.current);
        modelRef.current.destroy();
        modelRef.current = null;
      }

      try {
        console.log('Live2D: Loading model from', modelUrl);
        const model = await Live2DModel.from(modelUrl, { autoInteract: false });
        if (cancelled) { 
          console.log('Live2D: Load cancelled for', modelUrl);
          model.destroy(); 
          return; 
        }

        // Calculate dimensions
        const natW = model.internalModel?.originalWidth  || model.width  || 1000;
        const natH = model.internalModel?.originalHeight || model.height || 1000;
        
        console.log('Live2D: Model loaded. Natural size:', natW, 'x', natH);

        const scale = TARGET_MODEL_H / (natH || 1000);
        const windowW = Math.max(Math.round(natW * scale), 300);
        const windowH = Math.round(natH * scale) + UI_PADDING_H;
        
        console.log('Live2D: Resizing to', windowW, 'x', windowH, 'scale:', scale);

        // Update local and Electron state
        setSize({ w: windowW, h: windowH });
        app.renderer.resize(windowW, windowH);
        
        model.scale.set(scale);
        model.anchor.set(0.5, 1);
        model.x = windowW / 2;
        model.y = windowH;

        console.log('Live2D: Requesting Electron resizeWindow');
        window.electronAPI.resizeWindow(windowW, windowH);

        app.stage.addChild(model);
        modelRef.current = model;
        model.interactive = true;

        model.on('pointerdown', () => {
          try { model.motion(modelUrl.includes('katou') ? '' : 'TapBody'); } catch (_) {}
        });

        if (!cancelled) { setStatus('ready'); setStatusMsg(''); }
        console.log('Live2D: Render ready');
      } catch (e) {
        console.error('Live2D Error details:', e);
        if (!cancelled) {
          setStatus('error');
          setStatusMsg(`加载异常: ${modelUrl.split('/').pop()}`);
        }
      }
    };

    initAndLoad();

    return () => { 
      console.log('Live2D: useEffect cleanup (cancelled=true)');
      cancelled = true; 
    };
  }, [modelUrl]); // Re-run when modelUrl changes

  // Cleanup Pixi App on unmount only
  useEffect(() => {
    return () => {
      console.log('Live2D: Component unmounting, destroying app');
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
        overflow: 'visible'
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
            : <div style={{ fontWeight: '500' }}>✨ 召唤中... ✨</div>
          }
          <div style={{ opacity: 0.8, marginTop: '5px' }}>{statusMsg}</div>
        </div>
      )}
    </div>
  );
};

export default Live2DViewer;
