import { useCpuMetrics } from "../hooks/useMetrics";

export function CpuCard(){
    const cpu = useCpuMetrics();
    if (!cpu) return <div>Loading...</div>;
    return (
        <div>
            <h2>CPU</h2>
            <p>{cpu.overall.toFixed(1)}%</p>
            <p>{cpu.cores.length}</p>
        </div>
    );
}