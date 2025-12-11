import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const auth = useSelector((state) => state.auth.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header
      className="
        flex justify-between items-center px-6 md:px-10 py-4
        bg-[var(--chai-light)]/80 backdrop-blur-md
        border-b border-[var(--chai-border)]
        sticky top-0 z-30 shadow-sm 
      "
    >
      <Link to="/" className="flex items-center gap-2 group">
        <span className="text-2xl group-hover:scale-110 transition duration-200">
          ☕
        </span>
        <h1
          className="
            font-bold text-xl tracking-wide text-[var(--chai-text)]
            group-hover:text-[var(--chai-brown)]
            transition
          "
        >
          chaiDemy
        </h1>
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-[var(--chai-muted)]">
        {["courses", "study", "community"].map((link) => (
          <Link
            key={link}
            to={`#${link}`}
            className="
              hover:text-[var(--chai-brown)] 
              transition text-[15px] capitalize
            "
          >
            {link}
          </Link>
        ))}
      </nav>

      <div className="relative flex items-center gap-4">
        <Link to="/cart" className="relative hover:scale-105 transition">
          <ShoppingCart
            size={22}
            className="text-[var(--chai-text)] hover:text-[var(--chai-brown)] transition"
          />
        </Link>

        {auth ? (
          <div className="relative group">
            <div className="flex border rounded-full overflow-hidden cursor-pointer hover:scale-105 transition">
              <img
                className="h-11 w-11 object-cover"
                src={auth?.avatar?.url}
                alt="user"
              />
            </div>

            <div
              className="
                absolute right-0  w-64 mt-1 mr-[-100px] bg-white border rounded-xl p-4
                shadow-lg opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition duration-200
              "
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={auth?.avatar?.url}
                  alt="profile"
                />
                <div>
                  <p className="font-semibold truncate">
                    {auth?.firstName} {auth?.lastName}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {auth?.email}
                  </p>
                </div>
              </div>
              <div className="border-t pt-2 space-y-1 flex flex-col">
                <Link
                  to="/profile"
                  className="text-sm hover:text-[var(--chai-brown)] transition"
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="text-sm hover:text-[var(--chai-brown)] transition"
                >
                  Settings
                </Link>
                <Link
                  to="/public-profile"
                  className="text-sm hover:text-[var(--chai-brown)] transition"
                >
                  Public Profile
                </Link>

                <Link
                  to="/instructor"
                  className="text-sm hover:text-[var(--chai-brown)] transition"
                >
                  Instructor
                </Link>
              </div>
            </div>
          </div>
        ) : (
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
        )}

        <Link
          to="/get-started"
          className="
            hidden md:inline px-4 py-1.5 rounded-full
            font-semibold text-white
            bg-gradient-to-r from-[var(--chai-brown)] to-[var(--chai-dark)]
            hover:from-[var(--chai-dark)] hover:to-[var(--chai-brown)]
            shadow-md hover:shadow-lg transition
          "
        >
          Get Started
        </Link>

        <button
          className="md:hidden text-[var(--chai-text)]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="
            absolute top-full left-0 w-full bg-[var(--chai-light)]
            shadow-md py-4 flex flex-col items-center gap-4
            md:hidden animate-slideDown
          "
        >
          {["courses", "study", "community"].map((link) => (
            <Link
              key={link}
              to={`#${link}`}
              className="
                text-[var(--chai-text)] hover:text-[var(--chai-brown)] 
                transition text-lg capitalize
              "
            >
              {link}
            </Link>
          ))}
          <Link
            to="/get-started"
            className="
              px-4 py-2 rounded-full bg-gradient-to-r from-[var(--chai-brown)]
              to-[var(--chai-dark)] text-white shadow-md
            "
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
