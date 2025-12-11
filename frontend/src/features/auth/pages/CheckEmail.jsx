import React from "react";
import { useLocation, useNavigate } from "react-router";

const CheckEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = new URLSearchParams(location.search).get("email");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#F3ECDF] via-[#E3D5C3] to-[#D2BFA9]">
      <div className="backdrop-blur-md bg-gradient-to-b from-[#FCF6EE]/70 to-[#F0E3D3]/70 shadow-xl border border-[#D1BFA3] rounded-3xl px-8 py-12 w-full max-w-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(209,191,163,0.4)] hover:scale-[1.01]">
        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#92745D] to-[#6B5242] flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l9 6 9-6M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1z"
              />
            </svg>
          </div>
        </div>

        {/* TEXT */}
        <div className="text-center space-y-3 mb-6">
          <h2 className="text-3xl font-bold text-[#5C4A3F]">
            Check Your Mail 📬
          </h2>
          <p className="text-[#7A6658] text-sm leading-relaxed">
            We've sent a verification link to{" "}
            <span className="font-semibold">{email || "your email"}</span>.
            <br />
            Please open your inbox and click the link to activate your account.
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/signin")}
          className="w-full bg-gradient-to-r from-[#92745D] to-[#6B5242] hover:from-[#7A5E4A] hover:to-[#4E3B31] text-white font-semibold py-3 rounded-xl transition-transform hover:scale-[1.02] shadow-lg hover:shadow-2xl"
        >
          🚪 Go to Sign In
        </button>

        {/* FOOTER */}
        <p className="text-center text-[#7A6658] text-xs italic mt-6">
          “Chai ready hai, bas inbox check kar lo!” ☕
        </p>
      </div>
    </div>
  );
};

export default CheckEmail;
