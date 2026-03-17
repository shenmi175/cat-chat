import React, { useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

// Expose PIXI to window so pixi-live2d-display can find it
window.PIXI = PIXI;

const TORORO_URL = 'https://cdn.jsdelivr.net/gh/Eikanya/Live2d-model/Live2D/Samples/tororo/tororo.model3.json';

const Live2DViewer = ({ catState, isDragging }) => {
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const appRef = useRef(null);

  useEffect(() => {
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
        const model = await Live2DModel.from(TORORO_URL);
        modelRef.current = model;
        app.stage.addChild(model);

        // Scaling & Positioning
        const scale = 0.25; // Adjust based on model size
        model.scale.set(scale);
        model.x = 150 - (model.width / 2); // Center horizontally
        model.y = 150 - (model.height / 2); // Center vertically

        // Interaction Hit Areas
        model.interactive = true;
        
        // Listen for internal model events
        model.on('hit', (hitAreas) => {
          if (hitAreas.includes('Head')) {
            model.motion('Tap'); // Example motion
          }
        });

      } catch (e) {
        console.error('Failed to load Live2D model:', e);
      }
    })();

    return () => {
      app.destroy(true, true);
    };
  }, []);

  // Update animations based on external state
  useEffect(() => {
    if (!modelRef.current) return;
    const model = modelRef.current;

    if (isDragging) {
      // Play a specific motion for dragging (e.g. idle with high speed or specific struggle)
      model.motion('Idle', 0, PIXI.Live2DPriority.FORCE);
    } else if (catState === 'thinking') {
      model.motion('Idle', 1, PIXI.Live2DPriority.FORCE); 
    } else if (catState === 'happy') {
      model.motion('Tap', 0, PIXI.Live2DPriority.FORCE);
    }
  }, [catState, isDragging]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ width: '300px', height: '300px', cursor: 'pointer' }} 
    />
  );
};

export default Live2DViewer;
