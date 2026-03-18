import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

// Expose PIXI to window so pixi-live2d-display can find it
window.PIXI = PIXI;

// 1. 下载模型文件后，请放置在项目的 public/live2d/tororo/ 文件夹下
// 2. 所需文件包括：.model3.json, .moc3, .physics3.json 以及 textures 文件夹
const TORORO_URL = '/live2d/tororo/tororo.model3.json';

const Live2DViewer = ({ catState, isDragging, modelUrl }) => {
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const appRef = useRef(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // Initialize PIXI once
  useEffect(() => {
    console.log('Live2D: Initializing PixiJS Engine...');
    
    if (!window.Live2DCubismCore) {
      console.error('Live2D: Cubism Core (v3) missing! Please download and place in public/live2dcubismcore.min.js');
      setError('驱动缺失 (Core missing)');
      setLoading(false);
      return;
    }

    const app = new PIXI.Application({
      view: canvasRef.current,
      width: 300,
      height: 300,
      transparent: true,
      backgroundAlpha: 0,
      antialias: true,
      autoStart: true,
      resolution: window.devicePixelRatio || 1,
    });
    appRef.current = app;

    return () => {
      console.log('Live2D: Destroying Engine...');
      app.destroy(true, true);
    };
  }, []);

  // Handle model loading/switching
  useEffect(() => {
    if (!appRef.current || !modelUrl) return;

    (async () => {
      try {
        setError(null);
        // Cleanup old model
        if (modelRef.current) {
          appRef.current.stage.removeChild(modelRef.current);
          modelRef.current.destroy();
          modelRef.current = null;
        }

        console.log('Live2D: Loading model:', modelUrl);
        const model = await Live2DModel.from(modelUrl);
        console.log('Live2D: Loaded successfully!', model);
        
        modelRef.current = model;
        appRef.current.stage.addChild(model);

        // --- Model Specific Adjustments ---
        if (modelUrl.includes('katou')) {
          model.scale.set(0.12); 
          model.anchor.set(0.5, 0.2);
        } else if (modelUrl.includes('Wanko')) {
          model.scale.set(0.35); // Small dog needs larger scale
          model.anchor.set(0.5, 0.5);
        } else if (modelUrl.includes('Rice')) {
          model.scale.set(0.4); 
          model.anchor.set(0.5, 0.5);
        } else {
          // Standard humans (Haru, Hiyori, etc.)
          model.scale.set(0.1);
          model.anchor.set(0.5, 0.1); 
        }
        
        model.x = 150; 
        model.y = 150;
        model.interactive = true;
        
        model.on('hit', (hitAreas) => {
          console.log('Live2D: Hit:', hitAreas);
          const isKatou = modelUrl.includes('katou');
          const isSDK = modelUrl.includes('CubismSdk');
          
          if (hitAreas.some(h => h.toLowerCase().includes('head'))) {
            if (isKatou) {
              model.motion('mtn/I_FUN.mtn');
            } else if (isSDK) {
              // SDK models often have indexed motions or name-based ones
              model.motion('TapBody'); // Common name in SDK samples
            } else {
              model.motion('Tap');
            }
          }
        });

        setLoading(false);

      } catch (e) {
        console.error('Live2D: Load error:', e);
        setError(`加载失败: ${e.message || '资源路径错误'}`);
        setLoading(false);
      }
    })();
  }, [modelUrl]);

  // Update animations
  useEffect(() => {
    if (!modelRef.current) return;
    const model = modelRef.current;
    const isKatou = modelUrl.includes('katou');
    const isSDK = modelUrl.includes('CubismSdk');

    if (isDragging) {
      if (isKatou) model.motion('mtn/I_SURPRISE.mtn');
      else if (isSDK) model.motion('Idle', 1);
      else model.motion('Idle', 0, PIXI.Live2DPriority.FORCE);
    } else if (catState === 'thinking') {
      if (isKatou) model.motion('mtn/IDLING_02.mtn'); 
      else model.motion('Idle', 1); 
    } else if (catState === 'happy') {
      if (isKatou) {
        model.motion('mtn/I_FUN.mtn');
      } else if (isSDK) {
        model.motion('TapBody');
      } else {
        model.motion('Tap', 0, PIXI.Live2DPriority.FORCE);
      }
    }
  }, [catState, isDragging, modelUrl]);

  return (
    <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {loading && !error && (
        <div style={{ color: '#ff8a65', fontSize: '14px', animation: 'breathe 2s infinite' }}>
          (=^･ω･^=) 正在召唤中...
        </div>
      )}
      
      {error && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#ff8a65',
          fontSize: '12px',
          textAlign: 'center',
          padding: '20px',
          background: 'rgba(0,0,0,0.4)',
          borderRadius: '15px'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>😿</div>
          <div style={{ fontWeight: 'bold' }}>加载失败喵!</div>
          <div style={{ marginTop: '5px', opacity: 0.8 }}>{error}</div>
          <div style={{ fontSize: '10px', marginTop: '10px', opacity: 0.6 }}>
            请检查 F12 控制台日志
          </div>
        </div>
      )}

      <canvas 
        ref={canvasRef} 
        style={{ 
          position: 'absolute',
          width: '300px', 
          height: '300px', 
          cursor: 'pointer', 
          visibility: (error || loading) ? 'hidden' : 'visible',
          zIndex: 1
        }} 
      />
    </div>
  );
};

export default Live2DViewer;
