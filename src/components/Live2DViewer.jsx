import React, { useEffect, useLayoutEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

// pixi-live2d-display needs PIXI on window
window.PIXI = PIXI;

// Force legacy WebGL to avoid checkMaxIfStatementsInShader(0) crash in Electron
// This is a known issue when the GPU context isn't fully ready at init time
PIXI.settings.PREFER_ENV = PIXI.ENV.WEBGL_LEGACY;

const Live2DViewer = ({ catState, isDragging, modelUrl }) => {
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const appRef = useRef(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  // useLayoutEffect ensures the canvas is mounted in DOM before PIXI touches it
  useLayoutEffect(() => {
    if (!window.Live2DCubismCore) {
      console.error('Live2D: live2dcubismcore.min.js missing from /public/!');
      setError('驱动缺失: 请将 live2dcubismcore.min.js 放入 public 文件夹');
      setLoading(false);
      return;
    }

    let app;
    try {
      app = new PIXI.Application({
        view: canvasRef.current,
        width: 300,
        height: 300,
        backgroundAlpha: 0,
        antialias: true,
        autoStart: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        // Use WebGL1 which is more compatible in Electron
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.error('Live2D: PixiJS Application init failed:', e);
      setError(`渲染器初始化失败: ${e.message}`);
      setLoading(false);
      return;
    }

    appRef.current = app;
    console.log('Live2D: PixiJS ready, renderer:', app.renderer.type === 1 ? 'WebGL' : 'Canvas');

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }
    };
  }, []);

  // Load/switch model when modelUrl changes
  useEffect(() => {
    if (!appRef.current || !modelUrl) return;

    let cancelled = false;

    (async () => {
      try {
        setError(null);
        setLoading(true);

        // Remove old model
        if (modelRef.current) {
          appRef.current.stage.removeChild(modelRef.current);
          modelRef.current.destroy();
          modelRef.current = null;
        }

        console.log('Live2D: Loading model from', modelUrl);
        const model = await Live2DModel.from(modelUrl, { autoInteract: false });
        if (cancelled) return;

        console.log('Live2D: Model loaded OK', model.internalModel?.settings?.name ?? modelUrl);
        modelRef.current = model;
        appRef.current.stage.addChild(model);

        // Scale + center per model type
        const W = 300, H = 300;
        if (modelUrl.includes('Wanko')) {
          model.scale.set(0.3);
        } else if (modelUrl.includes('Rice')) {
          model.scale.set(0.35);
        } else if (modelUrl.includes('katou')) {
          model.scale.set(0.11);
        } else {
          model.scale.set(0.09); // Full-body humans: Haru, Hiyori, Mao, etc.
        }

        model.anchor.set(0.5, 0.5);
        model.x = W / 2;
        model.y = H / 2;
        model.interactive = true;

        // Click/tap reaction
        model.on('pointerdown', () => {
          try {
            model.motion(modelUrl.includes('katou') ? '' : 'TapBody');
          } catch (_) {}
        });

        setLoading(false);
      } catch (e) {
        if (cancelled) return;
        console.error('Live2D: Model load error:', e);
        setError(`加载失败: ${e.message ?? '未知错误'}`);
        setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [modelUrl]);

  // Animate on state change
  useEffect(() => {
    const model = modelRef.current;
    if (!model) return;
    try {
      if (isDragging) {
        model.motion(modelUrl.includes('katou') ? '' : 'Idle');
      } else if (catState === 'happy') {
        model.motion(modelUrl.includes('katou') ? '' : 'TapBody');
      } else if (catState === 'thinking') {
        model.motion('Idle');
      }
    } catch (_) {}
  }, [catState, isDragging, modelUrl]);

  return (
    <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {loading && !error && (
        <div style={{ color: '#ff8a65', fontSize: '14px' }}>
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
          padding: '16px',
          background: 'rgba(0,0,0,0.5)',
          borderRadius: '12px',
          maxWidth: '260px',
        }}>
          <div style={{ fontSize: '22px', marginBottom: '8px' }}>😿</div>
          <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>加载失败喵!</div>
          <div style={{ opacity: 0.85, fontSize: '11px' }}>{error}</div>
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
        }}
      />
    </div>
  );
};

export default Live2DViewer;
