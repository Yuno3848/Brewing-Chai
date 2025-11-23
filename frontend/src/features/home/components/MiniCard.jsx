const MiniCard = ({ title, value, sub }) => (
  <div
    className="
      bg-[var(--chai-light)]
      border border-[var(--chai-border)]
      rounded-xl p-3
    "
  >
    <p className="text-xs text-[var(--chai-muted)]">{title}</p>
    <h2 className="text-lg font-bold text-[var(--chai-text)]">{value}</h2>
    <p className="text-xs text-[var(--chai-muted)]">{sub}</p>
  </div>
);
export default MiniCard;
