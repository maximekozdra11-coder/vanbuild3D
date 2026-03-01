import { useStore } from '../store/useStore';
import VehicleSelector from './VehicleSelector';
import ViewControls from './ViewControls';
import Toolbar from './Toolbar';
import ExportImport from './ExportImport';

export default function SidePanel() {
  const panelOpen = useStore(s => s.panelOpen);
  const togglePanel = useStore(s => s.togglePanel);
  const selectedId = useStore(s => s.selectedId);
  const objects = useStore(s => s.objects);
  const updateObject = useStore(s => s.updateObject);
  const removeObject = useStore(s => s.removeObject);
  const rotateObject = useStore(s => s.rotateObject);

  const selected = objects.find(o => o.id === selectedId);

  return (
    <>
      <button
        onClick={togglePanel}
        className="absolute top-2 right-2 z-20 bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm font-bold shadow hover:bg-gray-700 transition-colors"
        aria-label="Toggle panel"
      >
        {panelOpen ? '✕ Close' : '☰ Menu'}
      </button>

      <aside
        className={`absolute top-0 right-0 h-full z-10 bg-gray-900 border-l border-gray-800 overflow-y-auto transition-transform duration-300 w-72 ${
          panelOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 pt-14">
          <h1 className="text-xl font-bold text-white mb-4">🚐 VanBuild3D</h1>

          <VehicleSelector />
          <ViewControls />
          <Toolbar />

          {selected && (
            <div className="mb-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                Selected: {selected.label}
              </h2>
              <div className="bg-gray-800 rounded-lg p-3 space-y-2">
                <label className="flex items-center justify-between text-sm text-gray-300">
                  <span>W (cm)</span>
                  <input
                    type="number"
                    value={selected.width}
                    min={10}
                    step={5}
                    onChange={e => updateObject(selected.id, { width: Number(e.target.value) })}
                    className="w-20 bg-gray-700 text-white rounded px-2 py-1 text-sm text-right"
                  />
                </label>
                <label className="flex items-center justify-between text-sm text-gray-300">
                  <span>H (cm)</span>
                  <input
                    type="number"
                    value={selected.height}
                    min={10}
                    step={5}
                    onChange={e => updateObject(selected.id, { height: Number(e.target.value) })}
                    className="w-20 bg-gray-700 text-white rounded px-2 py-1 text-sm text-right"
                  />
                </label>
                <label className="flex items-center justify-between text-sm text-gray-300">
                  <span>D (cm)</span>
                  <input
                    type="number"
                    value={selected.depth}
                    min={10}
                    step={5}
                    onChange={e => updateObject(selected.id, { depth: Number(e.target.value) })}
                    className="w-20 bg-gray-700 text-white rounded px-2 py-1 text-sm text-right"
                  />
                </label>
                <label className="flex items-center justify-between text-sm text-gray-300">
                  <span>X (cm)</span>
                  <input
                    type="number"
                    value={selected.x}
                    step={5}
                    onChange={e => updateObject(selected.id, { x: Number(e.target.value) })}
                    className="w-20 bg-gray-700 text-white rounded px-2 py-1 text-sm text-right"
                  />
                </label>
                <label className="flex items-center justify-between text-sm text-gray-300">
                  <span>Z (cm)</span>
                  <input
                    type="number"
                    value={selected.z}
                    step={5}
                    onChange={e => updateObject(selected.id, { z: Number(e.target.value) })}
                    className="w-20 bg-gray-700 text-white rounded px-2 py-1 text-sm text-right"
                  />
                </label>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => rotateObject(selected.id)}
                    className="flex-1 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 text-white text-sm font-semibold"
                  >
                    ↻ Rotate 90°
                  </button>
                  <button
                    onClick={() => removeObject(selected.id)}
                    className="flex-1 py-2 rounded-lg bg-red-700 hover:bg-red-600 text-white text-sm font-semibold"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          <ExportImport />

          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Objects ({objects.length})</h2>
            <div className="space-y-1">
              {objects.map(o => (
                <button
                  key={o.id}
                  onClick={() => useStore.getState().selectObject(o.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    o.id === selectedId ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <span className="inline-block w-3 h-3 rounded-sm mr-2 align-middle" style={{ background: o.color }} />
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
