import { create } from 'zustand';
import vehicles from '../data/vehicles.json';

const SNAP = 5; // 5cm grid snap

function snap(v) {
  return Math.round(v / SNAP) * SNAP;
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const OBJECT_DEFAULTS = {
  bed:     { label: 'Bed',          width: 120, height: 25, depth: 200, color: '#6366f1' },
  bench:   { label: 'Bench seat',   width: 120, height: 45, depth: 60,  color: '#f59e0b' },
  kitchen: { label: 'Kitchen unit', width: 120, height: 85, depth: 60,  color: '#10b981' },
  shower:  { label: 'Shower',       width: 80,  height: 200, depth: 80, color: '#06b6d4' },
  cabinet: { label: 'Cabinet',      width: 60,  height: 180, depth: 40, color: '#8b5cf6' },
  tank:    { label: 'Water tank',   width: 40,  height: 40,  depth: 60, color: '#3b82f6' },
};

function getSerializable(state) {
  return {
    vehicleId: state.vehicleId,
    objects: state.objects,
  };
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem('vanbuild3d');
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return null;
}

function saveToStorage(state) {
  localStorage.setItem('vanbuild3d', JSON.stringify(getSerializable(state)));
}

const saved = loadFromStorage();

export const useStore = create((set, get) => ({
  vehicleId: saved?.vehicleId ?? 'L2H2',
  objects: saved?.objects ?? [],
  selectedId: null,
  panelOpen: true,
  viewPreset: 'perspective',

  setVehicle(id) {
    set({ vehicleId: id });
    saveToStorage(get());
  },

  getVehicle() {
    return vehicles.find(v => v.id === get().vehicleId) ?? vehicles[0];
  },

  addObject(type) {
    const defaults = OBJECT_DEFAULTS[type];
    if (!defaults) return;
    const vehicle = get().getVehicle();
    const obj = {
      id: uid(),
      type,
      label: defaults.label,
      color: defaults.color,
      x: snap(vehicle.length / 2 - defaults.width / 2),
      z: snap(vehicle.width / 2 - defaults.depth / 2),
      width: defaults.width,
      height: defaults.height,
      depth: defaults.depth,
      rotation: 0,
    };
    const objects = [...get().objects, obj];
    set({ objects, selectedId: obj.id });
    saveToStorage({ ...get(), objects });
  },

  updateObject(id, changes) {
    const objects = get().objects.map(o =>
      o.id === id ? { ...o, ...changes } : o
    );
    set({ objects });
    saveToStorage({ ...get(), objects });
  },

  removeObject(id) {
    const objects = get().objects.filter(o => o.id !== id);
    set({ objects, selectedId: get().selectedId === id ? null : get().selectedId });
    saveToStorage({ ...get(), objects });
  },

  moveObject(id, x, z) {
    const objects = get().objects.map(o =>
      o.id === id ? { ...o, x: snap(x), z: snap(z) } : o
    );
    set({ objects });
    saveToStorage({ ...get(), objects });
  },

  rotateObject(id) {
    const obj = get().objects.find(o => o.id === id);
    if (!obj) return;
    const newRot = (obj.rotation + Math.PI / 2) % (Math.PI * 2);
    get().updateObject(id, { rotation: newRot });
  },

  selectObject(id) {
    set({ selectedId: id });
  },

  togglePanel() {
    set(s => ({ panelOpen: !s.panelOpen }));
  },

  setViewPreset(preset) {
    set({ viewPreset: preset });
  },

  exportJSON() {
    const data = getSerializable(get());
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vanbuild3d-project.json';
    a.click();
    URL.revokeObjectURL(url);
  },

  importJSON(data) {
    try {
      const parsed = typeof data === 'string' ? JSON.parse(data) : data;
      set({ vehicleId: parsed.vehicleId ?? 'L2H2', objects: parsed.objects ?? [], selectedId: null });
      saveToStorage(get());
    } catch (e) {
      console.error('Import failed:', e);
    }
  },

  resetProject() {
    set({ objects: [], selectedId: null, vehicleId: 'L2H2' });
    localStorage.removeItem('vanbuild3d');
  },

  getFloorArea() {
    return get().objects.reduce((sum, o) => sum + (o.width * o.depth) / 10000, 0);
  },

  getCollisions() {
    const objs = get().objects;
    const colliding = new Set();
    for (let i = 0; i < objs.length; i++) {
      for (let j = i + 1; j < objs.length; j++) {
        const a = objs[i];
        const b = objs[j];
        const aMinX = a.x - a.width / 2;
        const aMaxX = a.x + a.width / 2;
        const aMinZ = a.z - a.depth / 2;
        const aMaxZ = a.z + a.depth / 2;
        const bMinX = b.x - b.width / 2;
        const bMaxX = b.x + b.width / 2;
        const bMinZ = b.z - b.depth / 2;
        const bMaxZ = b.z + b.depth / 2;
        if (aMaxX > bMinX && aMinX < bMaxX && aMaxZ > bMinZ && aMinZ < bMaxZ) {
          colliding.add(a.id);
          colliding.add(b.id);
        }
      }
    }
    return colliding;
  },

  snap,
  OBJECT_DEFAULTS,
}));

export { snap, OBJECT_DEFAULTS };
