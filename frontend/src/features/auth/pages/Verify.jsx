import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import auth from "../api/auth.api";
import toast from "react-hot-toast";

const Verify = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [timer, setTimer] = useState(5); // ⏳ countdown timer

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await auth.verifyEmail(token); // API call
        if (res?.data) {
          setStatus("success");
          toast.success("Email verified successfully!");

          // Start countdown
          let timeLeft = 5;
          const interval = setInterval(() => {
            timeLeft -= 1;
            setTimer(timeLeft);
            if (timeLeft === 0) {
              clearInterval(interval);
              navigate("/signin");
            }
          }, 1000);
        } else {
          setStatus("error");
          toast.error("Invalid or expired verification link");
        }
      } catch (error) {
        setStatus("error");
        toast.error("Something went wrong");
      }
    };

    verifyEmail();
  }, [token, navigate]);

  const handleNavigate = () => {
    navigate("/signin");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#F3ECDF] via-[#E3D5C3] to-[#D2BFA9]">
      <div className="backdrop-blur-md bg-gradient-to-b from-[#FCF6EE]/70 to-[#F0E3D3]/70 shadow-xl border border-[#D1BFA3] rounded-3xl px-8 py-12 w-full max-w-md transition-all duration-300 hover:shadow-[0_0_25px_rgba(209,191,163,0.4)]">
        {status === "loading" && (
          <div className="text-center">
            <div className="text-4xl animate-spin">⏳</div>
            <p>Verifying your email...</p>
          </div>
        )}

        {status === "success" && (
          <>
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#92745D] to-[#6B5242] flex items-center justify-center shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <div className="text-center space-y-3 mb-6">
              <h2 className="text-3xl font-bold text-[#5C4A3F]">
                Email Verified!
              </h2>
              <p className="text-[#7A6658] text-sm leading-relaxed">
                You're all set! Redirecting to login in{" "}
                <span className="font-semibold">{timer}</span> seconds...
              </p>
            </div>

            <button
              onClick={handleNavigate}
              className="w-full bg-gradient-to-r from-[#92745D] to-[#6B5242] hover:from-[#7A5E4A] hover:to-[#4E3B31] text-white font-semibold py-3 rounded-xl transition-transform hover:scale-[1.02] shadow-lg hover:shadow-2xl"
            >
              ☕ Start Brewing
            </button>
          </>
        )}

        {status === "error" && (
          <div className="text-center">
            <p className="text-red-600 font-semibold">
              Verification link is invalid or expired
            </p>
          </div>
        )}

        <p className="text-center text-[#7A6658] text-xs italic mt-6">
          "Chai ready hai, ab login karo!"
        </p>
      </div>
    </div>
  );
};

export default Verify;
