import { useEffect, useRef } from "react";

import "./styles/index.css";

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const worker = new Worker(new URL("./worker.ts", import.meta.url));
    const offscreen = canvasRef.current.transferControlToOffscreen();

    worker.postMessage({ canvas: offscreen }, [offscreen]);

    return worker.terminate;
  }, []);

  return (
    <div>
      <canvas width="800" height="500" ref={canvasRef} />
    </div>
  );
};
