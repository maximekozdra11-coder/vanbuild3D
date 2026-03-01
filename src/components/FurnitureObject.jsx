import { useRef, useState, useCallback } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

const _plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const _raycaster = new THREE.Raycaster();
const _v3 = new THREE.Vector3();

export default function FurnitureObject({ obj, isSelected, isColliding }) {
  const { camera, gl } = useThree();
  const meshRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, z: 0 });

  const moveObject = useStore(s => s.moveObject);
  const selectObject = useStore(s => s.selectObject);
  const snap = useStore(s => s.snap);

  const { x, z, width, height, depth, rotation, color } = obj;

  const meshColor = isColliding ? '#ef4444' : isSelected ? '#fff' : color;

  const getGroundPoint = useCallback((e) => {
    const rect = gl.domElement.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0;
    const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((clientY - rect.top) / rect.height) * 2 + 1;
    _raycaster.setFromCamera({ x: nx, y: ny }, camera);
    const hit = _raycaster.ray.intersectPlane(_plane, _v3);
    return hit ? { x: hit.x, z: hit.z } : null;
  }, [camera, gl]);

  const onPointerDown = useCallback((e) => {
    e.stopPropagation();
    selectObject(obj.id);
    const pt = getGroundPoint(e.nativeEvent ?? e);
    if (pt) {
      dragOffset.current = { x: pt.x - x, z: pt.z - z };
    }
    setDragging(true);
    e.target?.setPointerCapture?.(e.pointerId);
  }, [obj.id, x, z, selectObject, getGroundPoint]);

  const onPointerMove = useCallback((e) => {
    if (!dragging) return;
    e.stopPropagation();
    const pt = getGroundPoint(e.nativeEvent ?? e);
    if (pt) {
      moveObject(obj.id, pt.x - dragOffset.current.x, pt.z - dragOffset.current.z);
    }
  }, [dragging, obj.id, moveObject, getGroundPoint]);

  const onPointerUp = useCallback((e) => {
    e.stopPropagation();
    setDragging(false);
    e.target?.releasePointerCapture?.(e.pointerId);
  }, []);

  return (
    <mesh
      ref={meshRef}
      position={[x, height / 2, z]}
      rotation={[0, rotation, 0]}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        color={meshColor}
        transparent
        opacity={0.85}
        roughness={0.6}
      />
      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(width + 1, height + 1, depth + 1)]} />
          <lineBasicMaterial color="#ffffff" />
        </lineSegments>
      )}
    </mesh>
  );
}
