import React, { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

window.PIXI = PIXI;
if (PIXI.settings) PIXI.settings.PREFER_ENV = 0;

const TARGET_MODEL_H = 400;

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

        // 3. Size Calculation (Normalized to 400px base)
        const natW = model.internalModel?.originalWidth  || model.width  || 400;
        const natH = model.internalModel?.originalHeight || model.height || 400;
        
        const renderScale = (TARGET_MODEL_H / natH) * globalScale;
        const scaledW = natW * renderScale;
        const scaledH = natH * renderScale;

        // 4. Update Local State and Parent
        setLocalSize({ w: scaledW, h: scaledH });
        canvasRef.current.width  = scaledW;
        canvasRef.current.height = scaledH;
        app.renderer.resize(scaledW, scaledH);

        model.scale.set(renderScale);
        model.anchor.set(0.5, 0.5);
        model.x = scaledW / 2;
        model.y = scaledH / 2;

        app.stage.addChild(model);
        modelRef.current = model;

        // 5. 'Viewport Snipping' - Crop canvas to pixel bounds
        app.ticker.update(); // Flush current frame
        const bounds = model.getBounds();

        // Recenter model to fill the NEW snipped canvas
        model.x = -bounds.x + (bounds.width / 2);
        model.y = -bounds.y + (bounds.height / 2);

        // Update renderer to exactly the bounding box
        const finalW = Math.max(bounds.width, 10);
        const finalH = Math.max(bounds.height, 10);
        
        setLocalSize({ w: finalW, h: finalH });
        canvasRef.current.width  = finalW;
        canvasRef.current.height = finalH;
        app.renderer.resize(finalW, finalH);

        // 6. Notify Parent about the exact pixel footprint
        if (onModelLoad) {
          onModelLoad({ width: finalW, height: finalH });
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
