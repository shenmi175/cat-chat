import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

window.PIXI = PIXI;
if (PIXI.settings) PIXI.settings.PREFER_ENV = 0;

const Live2DViewer = ({ petState, isDragging, modelUrl, globalScale = 1.0, onModelLoad }) => {
  const canvasRef = useRef(null);
  const appRef    = useRef(null);
  const modelRef  = useRef(null);
  const [localSize, setLocalSize] = useState({ w: 300, h: 400 });

  useEffect(() => {
    if (!canvasRef.current || !modelUrl) return;
    
    let cancelled = false;

    const run = async () => {
      // 1. PIXI App initialization (one-time)
      if (!appRef.current) {
        appRef.current = new PIXI.Application({
          view: canvasRef.current,
          width: 300,
          height: 400,
          backgroundAlpha: 0,
          antialias: true,
          autoStart: true,
        });
      }
      const app = appRef.current;

      // 2. Cleanup previous model
      if (modelRef.current) {
        app.stage.removeChild(modelRef.current);
        modelRef.current.destroy();
        modelRef.current = null;
      }

      try {
        const model = await Live2DModel.from(modelUrl, { autoInteract: false });
        if (cancelled) { model.destroy(); return; }

        // 3. Extract Natural Dimensions
        const natW = model.internalModel?.originalWidth  || model.width  || 400;
        const natH = model.internalModel?.originalHeight || model.height || 400;

        // 4. Update Local State and Parent
        const scaledW = natW * globalScale;
        const scaledH = natH * globalScale;

        setLocalSize({ w: scaledW, h: scaledH });
        canvasRef.current.width  = scaledW;
        canvasRef.current.height = scaledH;
        app.renderer.resize(scaledW, scaledH);

        model.scale.set(globalScale);
        model.anchor.set(0.5, 0.5);
        model.x = scaledW / 2;
        model.y = scaledH / 2;

        app.stage.addChild(model);
        modelRef.current = model;

        // 5. Notify Parent about the character's footprint
        if (onModelLoad) {
          onModelLoad({ width: scaledW, height: scaledH });
        }
      } catch (e) {
        console.error('[Live2D] Load failed:', e);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [modelUrl, globalScale]); // Re-run if model or global scale changes

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
    <div style={{ width: localSize.w, height: localSize.h, position: 'relative' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Live2DViewer;
