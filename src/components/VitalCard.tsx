interface VitalCardProps {
  label: string;
  value: number | string;
  unit: string;
  status: "normal" | "warning" | "critical";
  sparklineData?: number[];
  min?: number;
  max?: number;
}

const VitalCard = ({ label, value, unit, status, sparklineData = [], min = 0, max = 100 }: VitalCardProps) => {
  const statusColors = {
    normal: "text-success",
    warning: "text-warning",
    critical: "text-destructive",
  };

  const statusLabels = {
    normal: "Stable",
    warning: "Warning",
    critical: "Critical",
  };

  const percentage = typeof value === "number" ? ((value - min) / (max - min)) * 100 : 50;
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  // Simple sparkline path generation
  const generateSparklinePath = () => {
    if (sparklineData.length < 2) return "";
    
    const width = 60;
    const height = 20;
    const dataMin = Math.min(...sparklineData);
    const dataMax = Math.max(...sparklineData);
    const range = dataMax - dataMin || 1;
    
    const points = sparklineData.slice(-10).map((value, index) => {
      const x = (index / (sparklineData.slice(-10).length - 1)) * width;
      const y = height - ((value - dataMin) / range) * height;
      return `${x},${y}`;
    });
    
    return `M ${points.join(" L ")}`;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 relative overflow-hidden">
      {/* Circular gauge background */}
      <div className="relative w-32 h-32 mx-auto mb-2">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={`hsl(var(--${status === "normal" ? "success" : status === "warning" ? "warning" : "destructive"}))`}
            strokeWidth="8"
            strokeDasharray={`${(clampedPercentage / 100) * 251.2} 251.2`}
            className="transition-all duration-500"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xs text-muted-foreground mb-1">{label}</div>
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-xs text-muted-foreground">{unit}</div>
        </div>
      </div>

      {/* Sparkline */}
      {sparklineData.length > 0 && (
        <div className="flex justify-center mb-2">
          <svg width="60" height="20" className="opacity-70">
            <path
              d={generateSparklinePath()}
              fill="none"
              stroke={`hsl(var(--${status === "normal" ? "success" : status === "warning" ? "warning" : "destructive"}))`}
              strokeWidth="1.5"
            />
          </svg>
        </div>
      )}

      {/* Status */}
      <div className="flex items-center justify-center gap-2">
        <div className={`w-2 h-2 rounded-full ${statusColors[status].replace("text-", "bg-")}`}></div>
        <span className={`text-xs font-medium ${statusColors[status]}`}>
          {statusLabels[status]}
        </span>
      </div>
    </div>
  );
};

export default VitalCard;
