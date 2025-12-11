import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import auth from "../../auth/api/auth.api";
import toast from "react-hot-toast";

const AccountSecurity = () => {
  const user = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await auth.changePassword(data);
      console.log("change password :", response?.message);
      if (response?.success) {
        toast.success(response?.message || "Password changed successfully!");
      } else {
        console.error("❌ change password failed:", response.error);
        toast.error(response?.error || "Failed to change password!");
      }
    } catch (error) {
      console.log("error message :", error);
      toast.error(
        error?.message || "Something went wrong while changing password!"
      );
    }
  };

  return (
    <div className="flex justify-center items-start md:items-center min-h-[80vh] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-10 space-y-7 text-[#5D4037] border border-[#d6c5b8]/50 transition-transform duration-300 hover:shadow-2xl"
      >
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center tracking-wide">
          Update Account Security
        </h2>
        <div className="w-1/2 mx-auto border-t border-[#D0BFAF] opacity-50"></div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-sm">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={user?.email || ""}
            disabled
            {...register("email")}
            className="w-full border border-[#5D4037]/20 bg-white/50 disabled:bg-gray-100 disabled:text-gray-500 px-4 py-2.5 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-[#5D4037]/30 focus:border-transparent transition"
          />
        </div>

        {/* Current Password */}
        <div>
          <label htmlFor="password" className="block mb-1 font-medium text-sm">
            Current Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full border border-[#5D4037]/20 bg-white/50 px-4 py-2.5 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-[#5D4037]/30 focus:border-transparent transition"
          />
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="newPassword"
            className="block mb-1 font-medium text-sm"
          >
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            {...register("newPassword", {
              required: true,
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            className={`w-full px-4 py-2.5 rounded-lg shadow-sm outline-none transition focus:ring-2 focus:ring-[#5D4037]/30 ${
              errors.newPassword
                ? "border-red-500"
                : "border border-[#5D4037]/20 bg-white/50"
            }`}
          />
          {errors.newPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.newPassword.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-1 font-medium text-sm"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === getValues("newPassword") || "Passwords do not match",
            })}
            className={`w-full px-4 py-2.5 rounded-lg shadow-sm outline-none transition focus:ring-2 focus:ring-[#5D4037]/30 ${
              errors.confirmPassword
                ? "border-red-500"
                : "border border-[#5D4037]/20 bg-white/50"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2.5 rounded-lg bg-[#5D4037] text-white font-medium hover:-translate-y-0.5 hover:bg-[#4a342c] transition-all shadow-md hover:shadow-lg disabled:bg-[#5D4037]/50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountSecurity;
