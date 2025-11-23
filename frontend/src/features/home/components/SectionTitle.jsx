const SectionTitle = ({ title, subtitle }) => (
  <div className="max-w-screen-xl mx-auto px-8 mt-16 mb-6">
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="text-[var(--chai-muted)] mt-2">{subtitle}</p>
  </div>
);

export default SectionTitle