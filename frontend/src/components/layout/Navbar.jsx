import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header
      className="
          flex justify-between items-center px-8 py-4
          backdrop-blur-md
          bg-[var(--chai-light)]/80
          border-b border-[var(--chai-border)]
          sticky top-0 z-20
        "
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">☕</span>
        <h1 className="font-bold text-xl tracking-wide">chaiDemy</h1>
      </div>

      <nav className="hidden md:flex gap-6 text-[var(--chai-muted)]">
        <Link
          href="#courses"
          className="hover:text-[var(--chai-brown)] transition"
        >
          Courses
        </Link>
        <Link
          href="#study"
          className="hover:text-[var(--chai-brown)] transition"
        >
          Study Space
        </Link>
        <Link
          href="#community"
          className="hover:text-[var(--chai-brown)] transition"
        >
          Community
        </Link>
      </nav>

      <div className="flex gap-3">
        <Link
          to="/signin"
          className="
              border border-[var(--chai-border)]
              px-4 py-1.5 rounded-full
              text-[var(--chai-text)]
              hover:bg-[var(--chai-mid)]/60 transition
            "
        >
          Sign In
        </Link>
        <button
          className="
              px-4 py-1.5 rounded-full
              font-semibold text-white
              bg-gradient-to-r from-[var(--chai-brown)] to-[var(--chai-dark)]
              hover:from-[var(--chai-dark)] hover:to-[var(--chai-brown)]
              shadow-lg transition
            "
        >
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Navbar;
