import { useRamMetrics } from "../hooks/useMetrics";

export function RamCard(){
    const ram = useRamMetrics();
    if (!ram) return <div>Loading...</div>;
    return (
        <div>
            <h2>RAM</h2>
            <p>{ram.total_mb.toFixed(1)} MB</p>
            <p>{ram.used_mb.toFixed(1)} MB</p>
            <p>{ram.available_mb.toFixed(1)} MB</p>
        </div>
    );
}   