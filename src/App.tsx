import "./index.css";
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";
import { Float, PresentationControls } from "@react-three/drei";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

function Scene() {
  const gltf = useLoader(GLTFLoader, "/models/just_a_girl/scene.gltf");
  return <primitive object={gltf.scene} />;
}

export function App() {
  useThree(({ camera }) => {
    camera.position.set(-5, 90, 35);
    camera.rotation.set(0.06, -0.2, 0.012);
    // camera.lookAt(
    //   new Vector3(-0.8804659124961525, 103.65194286142722, -7.191185550957737)
    // );
  });

  const { camera } = useThree();

  const torusKnotRef = useRef<Mesh>(null);

  useFrame(({ mouse }, delta) => {
    if (!torusKnotRef.current) return;

    torusKnotRef.current.rotation.x += delta * 0.1;
    torusKnotRef.current.rotation.z += delta * 0.1;

    camera.position.x = mouse.x * 3;
    camera.position.y = mouse.y * 3;
  });

  return (
    <>
      {/* <CameraControls
        onEnd={() => {
          console.log("camera: ", camera);
          // console.log("position: ", camera.position);
        }}
      /> */}
      <ambientLight intensity={Math.PI / 2} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        decay={0}
        intensity={Math.PI}
      />
      <pointLight
        position={[-10, -10, -10]}
        decay={0}
        intensity={Math.PI}
      />
      <PresentationControls
        global
        azimuth={[-0.15, 0.15]}
        polar={[-0.15, 0.15]}
        snap
        speed={0.075}
      >
        <Float
          speed={0.085}
          floatIntensity={0.005}
        >
          {/* <TorusKnot
          ref={torusKnotRef}
          position={[0, 0, 0]}
        /> */}
          <Scene />
        </Float>
      </PresentationControls>
    </>
  );
}
