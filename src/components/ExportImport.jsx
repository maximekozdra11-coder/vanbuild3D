import { useRef } from 'react';
import { useStore } from '../store/useStore';

export default function ExportImport() {
  const exportJSON = useStore(s => s.exportJSON);
  const importJSON = useStore(s => s.importJSON);
  const resetProject = useStore(s => s.resetProject);
  const fileRef = useRef(null);

  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => importJSON(ev.target.result);
    reader.readAsText(file);
    e.target.value = '';
  }

  return (
    <div className="mb-4">
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Project</h2>
      <div className="flex flex-col gap-2">
        <button
          onClick={exportJSON}
          className="py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
        >
          ⬇ Export JSON
        </button>
        <button
          onClick={() => fileRef.current?.click()}
          className="py-2 px-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm font-semibold transition-colors"
        >
          ⬆ Import JSON
        </button>
        <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
        <button
          onClick={() => { if (confirm('Reset project? All objects will be lost.')) resetProject(); }}
          className="py-2 px-3 rounded-lg bg-red-700 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
        >
          🗑 Reset
        </button>
      </div>
    </div>
  );
}
