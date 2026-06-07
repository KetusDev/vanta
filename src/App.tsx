import { CpuCard } from "./components/CpuCard";
import { RamCard } from "./components/RamCard";


function App() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <CpuCard />
      <RamCard />
    </div>
  );
}

export default App;
