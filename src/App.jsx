import SceneCanvas from './components/SceneCanvas';
import SidePanel from './components/SidePanel';
import DimensionsOverlay from './components/DimensionsOverlay';

export default function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-950 text-white">
      <SceneCanvas />
      <DimensionsOverlay />
      <SidePanel />
    </div>
  );
}
