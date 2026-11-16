// One labelled progress bar. `value` is a percentage from 0 to 100.
export default function ScoreBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-ink">{label}</span>
        <span className="tabular-nums text-muted">{value}%</span>
      </div>
      <div className="h-3 bg-surface-2 overflow-hidden">
        <div className="score-fill h-3 bg-accent" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
