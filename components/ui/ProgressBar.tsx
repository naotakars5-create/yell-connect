export function ProgressBar({
  value,
  max,
  className = "",
}: {
  value: number;
  max: number;
  className?: string;
}) {
  const pct = max === 0 ? 0 : Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={`h-2 w-full rounded-full bg-warm-bg overflow-hidden ${className}`}>
      <div
        className="h-full rounded-full bg-yell-gradient transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
