import { ReactComponent as Ellipse } from './asset/App/elipse2.svg';

function App() {
  return (
    <div className="flex  min-h-screen bg-black">
      <div className="w-4/5 border border-[#141519] rounded-2xl overflow-hidden">
        <Ellipse className="w-full h-auto [&_*]:animate-dash [&_*]:[stroke-dasharray:2_14]" />
      </div>
    </div>
  );
}

export default App;
