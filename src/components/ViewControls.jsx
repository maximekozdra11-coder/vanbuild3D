import { useStore } from '../store/useStore';

const PRESETS = [
  { id: 'perspective', label: '3D' },
  { id: 'top', label: 'Top' },
  { id: 'side', label: 'Side' },
  { id: 'rear', label: 'Rear' },
];

export default function ViewControls() {
  const viewPreset = useStore(s => s.viewPreset);
  const setViewPreset = useStore(s => s.setViewPreset);

  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">View</h2>
      <div className="flex gap-2">
        {PRESETS.map(p => (
          <button
            key={p.id}
            onClick={() => setViewPreset(p.id)}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${
              viewPreset === p.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
