import React, { useState } from "react";
import { useForm } from "react-hook-form";
import auth from "../api/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const [verifyOption, setVerifyOption] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await auth.signIn(data);
      if (response?.data) {
        toast.success(response?.data);
        console.log("📚 Sign-in success:", response.data);
      } else {
        if (response?.error == "Email is not verified!") {
          setVerifyOption(true);
        }
        toast.error(response.error || "Failed to sign in");
        console.log("else in sign in :", response.error);
        console.error("🚫 Sign-in failed:", response);
      }
    } catch (error) {
      toast.error("Something went wrong while singing in");
      console.error("❌ Error:", error);
    }
  };

  const handleResendEmail = async () => {
    const email = getValues("email");
    setIsResending(true);
    try {
      const response = await auth.resendVerifyEmail(email);
      if (response?.data) {
        toast.success(
          response?.data || "Email verification sent successfully!"
        );
        console.log("📚 Email send successfully:", response);
      } else {
        toast.error(response?.error || "Failed to send resend email");
        console.log("Email failed :", response.error);
      }
    } catch (error) {
      toast.error("Something went wrong while resending email");
      console.error("❌ Error:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F3ECDF] via-[#E9DCCC] to-[#CDC0B2]">
      <div className="backdrop-blur-md bg-gradient-to-b from-[#FFF6ED]/70 to-[#F5E5D1]/70 shadow-xl border border-[#D1BFA3] rounded-3xl px-8 py-10 w-full max-w-md transition-all duration-300 space-y-8 hover:shadow-[0_0_30px_rgba(209,191,163,0.35)] hover:scale-[1.01]">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-[#5C4A3F]">Login</h2>
          <p className="text-[#7A6658] text-sm">
            “Login & power your study with chai”
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-[#5C4A3F] font-semibold">
              📧 Email
            </label>
            <input
              id="email"
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="e.g. coder@studychai.com"
              className={`w-full mt-1 px-3 py-2 border rounded-lg outline-none bg-[#FFF8F1]/80 focus:ring-2 focus:ring-[#8B6F55] placeholder:text-[#B79B8A] ${
                errors.email ? "border-red-500" : "border-[#CDB79E]"
              }`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-[#5C4A3F] font-semibold">
              🔐 Password
            </label>
            <input
              id="password"
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Enter your study key"
              className={`w-full mt-1 px-3 py-2 border rounded-lg outline-none bg-[#FFF8F1]/80 focus:ring-2 focus:ring-[#8B6F55] ${
                errors.password ? "border-red-500" : "border-[#CDB79E]"
              }`}
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#92745D] to-[#6B5242] hover:from-[#7A5E4A] hover:to-[#4E3B31] text-white font-semibold py-3 rounded-xl transition-transform hover:scale-[1.02] shadow-lg hover:shadow-2xl disabled:opacity-50"
          >
            {isSubmitting ? "📖 Brewing focus..." : "📖 Start Study Session"}
          </button>

          {verifyOption && (
            <button
              type="button"
              disabled={isResending}
              onClick={handleResendEmail}
              className="w-full bg-gradient-to-r from-[#92745D] to-[#6B5242] hover:from-[#7A5E4A] hover:to-[#4E3B31] text-white font-semibold py-3 rounded-xl transition-transform hover:scale-[1.02] shadow-lg hover:shadow-2xl disabled:opacity-50"
            >
              {isResending ? "📨 Sending..." : "Resend Verification Link"}
            </button>
          )}

          {/* FOOTER */}
          <p className="text-center text-[#7A6658] text-xs italic">
            “Ek cup chai, aur study drive high!”
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
