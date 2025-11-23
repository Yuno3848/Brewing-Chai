import React from "react";
import { useForm } from "react-hook-form";
import auth from "../api/auth.api";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await auth.forgotPassword(data); // Make sure this API exists
      if (response?.data) {
        toast.success(
          response?.data || "Password reset link send successfully!"
        );
        console.log("📬 Reset link sent:", response.data);
      } else {
        toast.error(response?.error || "Failed to send password reset link")
        console.error("🚫 Error sending reset link:", response.error);
      }
    } catch (error) {
      toast.error("Something went wrong while sending reset password link!")
      console.error("❌ Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F3ECDF] via-[#E9DCCC] to-[#CDC0B2]">
      <div className="backdrop-blur-md bg-gradient-to-b from-[#FFF6ED]/70 to-[#F5E5D1]/70 shadow-xl border border-[#D1BFA3] rounded-3xl px-8 py-10 w-full max-w-md transition-all duration-300 space-y-8 hover:shadow-[0_0_30px_rgba(209,191,163,0.35)] hover:scale-[1.01]">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-[#5C4A3F]">Forgot Password</h2>
          <p className="text-[#7A6658] text-sm">
            “Let chai help recover your study access”
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-[#5C4A3F] font-semibold">
              📧 Registered Email
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

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#92745D] to-[#6B5242] hover:from-[#7A5E4A] hover:to-[#4E3B31] text-white font-semibold py-3 rounded-xl transition-transform hover:scale-[1.02] shadow-lg hover:shadow-2xl disabled:opacity-50"
          >
            {isSubmitting ? "🫖 Brewing recovery..." : "🔁 Send Reset Link"}
          </button>

          {/* FOOTER */}
          <p className="text-center text-[#7A6658] text-xs italic">
            “Thodi chai, thoda time – password yaad ho jayega fine!”
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
