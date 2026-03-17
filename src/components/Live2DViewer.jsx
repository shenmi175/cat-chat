import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

// Expose PIXI to window so pixi-live2d-display can find it
window.PIXI = PIXI;

// 1. 下载模型文件后，请放置在项目的 public/live2d/tororo/ 文件夹下
// 2. 所需文件包括：.model3.json, .moc3, .physics3.json 以及 textures 文件夹
const TORORO_URL = '/live2d/tororo/tororo.model3.json';

const Live2DViewer = ({ catState, isDragging }) => {
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const appRef = useRef(null);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    console.log('Live2D: Initializing PixiJS...');
    
    if (!window.Live2DCubismCore) {
      console.error('Live2D: Cubism Core is missing! Check index.html script tag.');
      setError('Core missing');
      return;
    }

    // 1. Initialize PIXI Application
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

    // 2. Load Live2D Model
    (async () => {
      try {
        console.log('Live2D: Loading model from:', TORORO_URL);
        const model = await Live2DModel.from(TORORO_URL);
        console.log('Live2D: Model loaded successfully!', model);
        
        modelRef.current = model;
        app.stage.addChild(model);

        // Scaling & Positioning
        const scale = 0.15; // Adjusted for Tororo
        model.scale.set(scale);
        model.anchor.set(0.5, 0.5);
        model.x = 150; 
        model.y = 150;

        // Interaction Hit Areas
        model.interactive = true;
        
        model.on('hit', (hitAreas) => {
          console.log('Live2D: Hit detected:', hitAreas);
          if (hitAreas.includes('Head')) {
            model.motion('Tap');
          }
        });

      } catch (e) {
        console.error('Live2D: Load error:', e);
        setError('Load failed');
      }
    })();

    return () => {
      console.log('Live2D: Cleaning up...');
      app.destroy(true, true);
    };
  }, []);

  // Update animations based on external state
  useEffect(() => {
    if (!modelRef.current) return;
    const model = modelRef.current;

    console.log('Live2D: State changed:', { catState, isDragging });
    if (isDragging) {
      model.motion('Idle', 0, PIXI.Live2DPriority.FORCE);
    } else if (catState === 'thinking') {
      model.motion('Idle', 1, PIXI.Live2DPriority.FORCE); 
    } else if (catState === 'happy') {
      model.motion('Tap', 0, PIXI.Live2DPriority.FORCE);
    }
  }, [catState, isDragging]);

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
