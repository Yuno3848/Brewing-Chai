const CourseCard = ({ level, title, lessons, time, tag }) => (
  <div
    className="
      bg-[var(--chai-cream)]
      border border-[var(--chai-border)]
      rounded-xl p-4 shadow transition hover:shadow-xl
    "
  >
    <div className="flex justify-between">
      <span className="text-xs bg-[var(--chai-light)] px-2 py-1 rounded-full">
        {level}
      </span>
      <span className="text-xs bg-[var(--chai-mid)] px-2 py-1 rounded-full">
        {tag}
      </span>
    </div>
    <h3 className="mt-3 font-semibold">{title}</h3>
    <p className="text-xs text-[var(--chai-muted)] mt-1">
      {lessons} • {time}
    </p>
    <button className="mt-3 w-full btn-chai-soft">Start Learning</button>
  </div>
);
export default CourseCard;