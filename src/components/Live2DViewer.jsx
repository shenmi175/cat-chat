import { useEffect, useRef, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

window.PIXI = PIXI;
if (PIXI.settings) PIXI.settings.PREFER_ENV = 0;

const TARGET_MODEL_H = 400;
const MODEL_PADDING = 8;

const Live2DViewer = ({ petState, isDragging, modelUrl, globalScale = 1.0, onModelLoad }) => {
  const canvasRef = useRef(null);
  const appRef    = useRef(null);
  const modelRef  = useRef(null);
  const lastReportedSizeRef = useRef({ width: 0, height: 0 });
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

        const initialW = Math.ceil(scaledW);
        const initialH = Math.ceil(scaledH);
        canvasRef.current.width  = initialW;
        canvasRef.current.height = initialH;
        app.renderer.resize(initialW, initialH);

        model.scale.set(renderScale);
        model.anchor.set(0.5, 0.5);
        model.x = initialW / 2;
        model.y = initialH / 2;

        app.stage.addChild(model);
        modelRef.current = model;

        // 5. 'Viewport Snipping' - Crop canvas to pixel bounds
        app.ticker.update(); // Flush current frame
        const bounds = model.getBounds();

        // Shift by delta rather than replacing x/y, otherwise the model can jump.
        model.x += MODEL_PADDING - bounds.x;
        model.y += MODEL_PADDING - bounds.y;

        // Keep a small transparent guard band so animation bounds do not clip/flicker.
        const finalW = Math.ceil(Math.max(bounds.width + MODEL_PADDING * 2, 80));
        const finalH = Math.ceil(Math.max(bounds.height + MODEL_PADDING * 2, 80));
        
        setLocalSize({ w: finalW, h: finalH });
        canvasRef.current.width  = finalW;
        canvasRef.current.height = finalH;
        app.renderer.resize(finalW, finalH);

        const lastSize = lastReportedSizeRef.current;
        if (onModelLoad && (lastSize.width !== finalW || lastSize.height !== finalH)) {
          lastReportedSizeRef.current = { width: finalW, height: finalH };
          onModelLoad({ width: finalW, height: finalH });
        }
      } catch (e) {
        console.error('[Live2D] Load failed:', e);
      }
    };

    run();
    return () => { cancelled = true; };
  }, [modelUrl, globalScale, onModelLoad]); // Re-run if model, scale, or callback changes

  // Motion control
  useEffect(() => {
    if (modelRef.current) {
      try {
        if (isDragging) modelRef.current.motion('Idle');
        else if (petState === 'happy') modelRef.current.motion('TapBody');
      } catch (error) {
        if (import.meta.env.DEV) {
          console.debug('[Live2D] Motion unavailable:', error);
        }
      }
    }
  }, [petState, isDragging]);

  return (
    <div className="live2d-stage" style={{ width: localSize.w, height: localSize.h }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default Live2DViewer;
