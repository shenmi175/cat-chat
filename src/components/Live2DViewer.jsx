import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

window.PIXI = PIXI;
if (PIXI.settings) PIXI.settings.PREFER_ENV = 0;

const TARGET_MODEL_H = 400; 
const UI_PADDING_H = 80; 
const BOTTOM_UI_H = 70; // Space for input area

const Live2DViewer = ({ petState, isDragging, modelUrl, globalScale = 1.0, onHeadPosChange }) => {
  const canvasRef = useRef(null);
  const appRef    = useRef(null);
  const modelRef  = useRef(null);
  const [size, setSize] = useState({ w: 350, h: 550 });

  // Scaled constants
  const scaledModelH = TARGET_MODEL_H * globalScale;
  const scaledPaddingH = UI_PADDING_H * globalScale;

  useEffect(() => {
    if (!canvasRef.current || !modelUrl) return;
    
    let cancelled = false;

    const run = async () => {
      // 1. Setup App
      if (!appRef.current) {
        appRef.current = new PIXI.Application({
          view: canvasRef.current,
          width: size.w,
          height: size.h,
          backgroundAlpha: 0,
          antialias: true,
          autoStart: true,
        });
      }
      const app = appRef.current;

      // 2. Clear old model
      if (modelRef.current) {
        app.stage.removeChild(modelRef.current);
        modelRef.current.destroy();
        modelRef.current = null;
      }

      try {
        const model = await Live2DModel.from(modelUrl, { autoInteract: false });
        if (cancelled) { model.destroy(); return; }

        // 3. Size Calculation
        const natW = model.internalModel?.originalWidth || model.width || 800;
        const natH = model.internalModel?.originalHeight || model.height || 1000;
        const scale = scaledModelH / natH;
        
        const winW = Math.max(Math.round(natW * scale), 300 * globalScale);
        const winH = Math.round(natH * scale) + scaledPaddingH + (BOTTOM_UI_H * globalScale);

        // 4. Apply Sizes
        setSize({ w: winW, h: winH });
        canvasRef.current.width = winW;
        canvasRef.current.height = winH;
        app.renderer.resize(winW, winH);

        model.scale.set(scale);
        model.anchor.set(0.5, 1);
        model.x = winW / 2;
        model.y = winH - (BOTTOM_UI_H * globalScale);

        app.stage.addChild(model);
        modelRef.current = model;

        // 5. Update Window & Report Head Pos
        window.electronAPI.resizeWindow(winW, winH);
        if (onHeadPosChange) onHeadPosChange(scaledPaddingH);
      } catch (e) {
        console.error('Failed to load Live2D model:', e);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [modelUrl, globalScale, onHeadPosChange]);

  // Motion control
  useEffect(() => {
    if (modelRef.current) {
      try {
        if (isDragging) modelRef.current.motion('Idle');
        else if (petState === 'happy') modelRef.current.motion('TapBody');
      } catch (_) {}
    }
  }, [petState, isDragging]);

  return (
    <div style={{ width: size.w, height: size.h, position: 'relative' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Live2DViewer;
