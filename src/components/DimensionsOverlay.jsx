import { useStore } from '../store/useStore';

export default function DimensionsOverlay() {
  const getVehicle = useStore(s => s.getVehicle);
  const getFloorArea = useStore(s => s.getFloorArea);
  const getCollisions = useStore(s => s.getCollisions);

  const vehicle = getVehicle();
  const floorArea = getFloorArea();
  const collisions = getCollisions();

  return (
    <div className="absolute top-2 left-2 bg-gray-900 bg-opacity-80 rounded-lg px-3 py-2 text-xs text-gray-300 pointer-events-none z-10">
      <div className="font-bold text-green-400 text-sm mb-1">{vehicle.id}</div>
      <div>L {vehicle.length} cm</div>
      <div>W {vehicle.width} cm</div>
      <div>H {vehicle.height} cm</div>
      <div className="mt-1 border-t border-gray-700 pt-1">
        Floor used: <span className="text-yellow-400">{floorArea.toFixed(2)} m²</span>
      </div>
      {collisions.size > 0 && (
        <div className="mt-1 text-red-400 font-bold">
          ⚠ {collisions.size} collision{collisions.size > 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
