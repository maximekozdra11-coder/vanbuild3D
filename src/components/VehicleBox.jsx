import { useMemo } from 'react';
import * as THREE from 'three';

export default function VehicleBox({ vehicle }) {
  const { length, width, height } = vehicle;

  const edges = useMemo(() => {
    const box = new THREE.BoxGeometry(length, height, width);
    return new THREE.EdgesGeometry(box);
  }, [length, width, height]);

  return (
    <group name="vehicleGroup" position={[0, height / 2, 0]}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#4ade80" linewidth={2} />
      </lineSegments>
    </group>
  );
}
