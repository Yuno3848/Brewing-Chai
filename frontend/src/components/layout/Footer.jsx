import React from "react";

const Footer = () => {
  return (
    <footer
      className="
          bg-[var(--chai-mid)]  py-6
          border-t border-[var(--chai-border)]
        "
    >
      <div className="max-w-screen-xl mx-auto px-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">☕</span>
          <p className="font-semibold">chaiDemy</p>
        </div>
        <p className="text-[var(--chai-muted)] text-xs">
          Brewed in India. Made for learners everywhere.
        </p>
      </div>
    </footer>
  );
};

export default Footer
