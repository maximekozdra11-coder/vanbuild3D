import { Canvas } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import OrbitControls from './OrbitControls';
import VehicleBox from './VehicleBox';
import FurnitureObject from './FurnitureObject';

export default function SceneCanvas() {
  const getVehicle = useStore(s => s.getVehicle);
  const objects = useStore(s => s.objects);
  const selectedId = useStore(s => s.selectedId);
  const viewPreset = useStore(s => s.viewPreset);
  const selectObject = useStore(s => s.selectObject);
  const getCollisions = useStore(s => s.getCollisions);

  const vehicle = getVehicle();
  const collisions = getCollisions();

  const gridSize = Math.max(vehicle.length, vehicle.width) * 1.5;
  const divisions = Math.floor(gridSize / 5);

  return (
    <Canvas
      shadows
      camera={{ fov: 50, near: 1, far: 10000, position: [400, 500, 600] }}
      style={{ width: '100%', height: '100%', background: '#111827' }}
      onPointerMissed={() => selectObject(null)}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[500, 800, 500]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-300, 400, -300]} intensity={0.3} />

      <gridHelper
        args={[gridSize, divisions, '#374151', '#1f2937']}
        position={[0, 0, 0]}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} visible={false}>
        <planeGeometry args={[10000, 10000]} />
        <meshBasicMaterial />
      </mesh>

      <VehicleBox vehicle={vehicle} />

      {objects.map(obj => (
        <FurnitureObject
          key={obj.id}
          obj={obj}
          isSelected={obj.id === selectedId}
          isColliding={collisions.has(obj.id)}
        />
      ))}

      <OrbitControls viewPreset={viewPreset} />
    </Canvas>
  );
}
