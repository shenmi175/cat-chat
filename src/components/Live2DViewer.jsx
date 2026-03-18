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

  // Initialize PIXI once
  useEffect(() => {
    console.log('Live2D: Initializing PixiJS Engine...');
    
    if (!window.Live2DCubismCore) {
      console.error('Live2D: Cubism Core (v3) missing!');
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
          // Katou v2 model usually needs different scaling/positioning
          model.scale.set(0.12); 
          model.anchor.set(0.5, 0.2); // Adjust anchor so she sits better in the 300x300 box
        } else {
          // Default Tororo cat
          model.scale.set(0.15);
          model.anchor.set(0.5, 0.5);
        }
        
        model.x = 150; 
        model.y = 150;
        model.interactive = true;
        
        model.on('hit', (hitAreas) => {
          console.log('Live2D: Hit:', hitAreas);
          if (hitAreas.includes('Head') || hitAreas.includes('head')) {
            model.motion('Tap');
            // Katou v2 might use indexed motions if names aren't mapped
            if (modelUrl.includes('katou')) model.motion('mtn/01_idle.mtn'); 
          }
        });

      } catch (e) {
        console.error('Live2D: Load error:', e);
        setError(e.message || 'Load failed');
      }
    })();
  }, [modelUrl]);

  // Update animations
  useEffect(() => {
    if (!modelRef.current) return;
    const model = modelRef.current;

    if (isDragging) {
      model.motion('Idle', 0, PIXI.Live2DPriority.FORCE);
    } else if (catState === 'thinking') {
      // Different index for thinking
      model.motion('Idle', 1, PIXI.Live2DPriority.FORCE); 
    } else if (catState === 'happy') {
      if (modelUrl.includes('katou')) {
        model.motion('mtn/03_happy.mtn');
      } else {
        model.motion('Tap', 0, PIXI.Live2DPriority.FORCE);
      }
    }
  }, [catState, isDragging, modelUrl]);

  return (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      {error && (
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#ff8a65',
          fontSize: '12px',
          textAlign: 'center',
          padding: '20px'
        }}>
          <div>(=^･ω･^=)</div>
          <div style={{ marginTop: '10px' }}>模型加载失败: {error}</div>
          <div style={{ fontSize: '10px', opacity: 0.7 }}>请检查网络或刷新</div>
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        style={{ width: '300px', height: '300px', cursor: 'pointer', visibility: error ? 'hidden' : 'visible' }} 
      />
    </div>
  );
};

export default Live2DViewer;
