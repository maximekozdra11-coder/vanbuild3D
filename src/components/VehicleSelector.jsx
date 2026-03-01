import vehicles from '../data/vehicles.json';
import { useStore } from '../store/useStore';

export default function VehicleSelector() {
  const vehicleId = useStore(s => s.vehicleId);
  const setVehicle = useStore(s => s.setVehicle);

  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Vehicle</h2>
      <div className="grid grid-cols-2 gap-2">
        {vehicles.map(v => (
          <button
            key={v.id}
            onClick={() => setVehicle(v.id)}
            className={`py-2 px-3 rounded-lg text-sm font-semibold transition-colors ${
              vehicleId === v.id
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  );
}
