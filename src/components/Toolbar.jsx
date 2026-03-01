import { useStore } from '../store/useStore';

const OBJECT_TYPES = [
  { type: 'bed',     label: '🛏 Bed' },
  { type: 'bench',   label: '🪑 Bench' },
  { type: 'kitchen', label: '🍳 Kitchen' },
  { type: 'shower',  label: '🚿 Shower' },
  { type: 'cabinet', label: '🗄 Cabinet' },
  { type: 'tank',    label: '💧 Tank' },
];

export default function Toolbar() {
  const addObject = useStore(s => s.addObject);

  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Add Object</h2>
      <div className="grid grid-cols-2 gap-2">
        {OBJECT_TYPES.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => addObject(type)}
            className="py-2 px-3 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600 text-sm font-semibold transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
