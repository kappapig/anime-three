import "./index.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { App } from "./App";
import { Suspense } from "react";
import { Preload } from "@react-three/drei";
import { Loading } from "./Loading";

createRoot(document.getElementById("root") as HTMLElement).render(
  <div className='grid items-center justify-center h-dvh'>
    <Suspense fallback={<Loading />}>
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
        }}
      >
        <App />
        <Preload all />
      </Canvas>
    </Suspense>
  </div>
);
