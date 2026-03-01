import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default function OrbitControls({ viewPreset }) {
  const { camera, gl } = useThree();
  const controlsRef = useRef(null);

  useEffect(() => {
    const controls = new ThreeOrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 50;
    controls.maxDistance = 2000;
    controlsRef.current = controls;
    return () => controls.dispose();
  }, [camera, gl]);

  useEffect(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;
    const cx = 0, cy = 0, cz = 0;
    controls.target.set(cx, cy, cz);
    if (viewPreset === 'top') {
      camera.position.set(cx, 800, cz + 0.01);
      camera.up.set(0, 0, -1);
    } else if (viewPreset === 'side') {
      camera.position.set(cx - 800, 200, cz);
      camera.up.set(0, 1, 0);
    } else if (viewPreset === 'rear') {
      camera.position.set(cx, 200, cz - 800);
      camera.up.set(0, 1, 0);
    } else {
      camera.position.set(cx + 400, 500, cz + 600);
      camera.up.set(0, 1, 0);
    }
    camera.lookAt(cx, cy, cz);
    controls.update();
  }, [viewPreset, camera]);

  useFrame(() => {
    if (controlsRef.current) controlsRef.current.update();
  });

  return null;
}
