import React from "react";
import { useForm } from "react-hook-form";
import auth from "../api/auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await auth.signUp(data);
      if (response?.data?.success) {
        console.log("🎉 Signup success:", response.data);

        toast.success(response?.data?.message || "Signed up successfully!");
        navigate("/check-email");
      } else {
        console.error("❌ Signup failed:", response.error);
        toast.error(response?.error || "Failed to Signed up!");
      }
    } catch (error) {
      console.log("error message :", error);
      toast.error("Something went wrong while signing up!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F3ECDF] via-[#E3D5C3] to-[#D2BFA9]">
      <div className="backdrop-blur-md bg-gradient-to-b from-[#FCF6EE]/70 to-[#F0E3D3]/70 shadow-xl border border-[#D1BFA3] rounded-3xl px-8 py-10 w-full max-w-md transition-all duration-300 space-y-8 hover:shadow-[0_0_25px_rgba(209,191,163,0.4)] hover:scale-[1.01]">
        {/* HEADER */}
        <div className="text-center space-y-2">
          <div className="text-6xl animate-pulse">☕</div>
          <h2 className="text-3xl font-bold text-[#5C4A3F]">Chaidemy </h2>
          <p className="text-[#7A6658] text-sm">Brew your account today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* SECTION: AVATAR */}
          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              id="avatarUpload"
              {...register("avatar")}
              className="hidden"
            />

            <label
              htmlFor="avatarUpload"
              className="cursor-pointer w-24 h-24 rounded-full border border-[#CDB79E] shadow-md flex items-center justify-center hover:opacity-80 transition"
            >
              {watch("avatar") && watch("avatar")[0] ? (
                <img
                  src={URL.createObjectURL(watch("avatar")[0])}
                  alt="Avatar Preview"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-[#8B6F55]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.121 17.804A9 9 0 1112 21a9.001 9.001 0 01-6.879-3.196z"
                  />
                </svg>
              )}
            </label>
            <p className="text-xs text-[#7A6658] mt-2">
              Click to upload profile picture
            </p>
          </div>

          {/* SECTION: PERSONAL DETAILS */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="text-[#5C4A3F] font-semibold"
                >
                  ☕ First Name
                </label>
                <input
                  id="firstName"
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "At least 2 characters required",
                    },
                  })}
                  type="text"
                  placeholder="First name"
                  className="w-full mt-1 border outline-none border-[#CDB79E] rounded-lg px-3 py-2 bg-[#FFF8F1]/80 focus:ring-2 focus:ring-[#8B6F55] placeholder:text-[#B79B8A]"
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="text-[#5C4A3F] font-semibold"
                >
                  ☕ Last Name
                </label>
                <input
                  id="lastName"
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "At least 2 characters required",
                    },
                  })}
                  type="text"
                  placeholder="Last name"
                  className="w-full mt-1 border outline-none border-[#CDB79E] rounded-lg px-3 py-2 bg-[#FFF8F1]/80 focus:ring-2 focus:ring-[#8B6F55] placeholder:text-[#B79B8A]"
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="text-[#5C4A3F] font-semibold">
                📧 Email
              </label>
              <input
                id="email"
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 border outline-none border-[#CDB79E] rounded-lg px-3 py-2 bg-[#FFF8F1]/80 focus:ring-2 focus:ring-[#8B6F55] placeholder:text-[#B79B8A]"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* SECTION: SECURITY */}
          <div className="space-y-4">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="text-[#5C4A3F] font-semibold"
              >
                🔐 Password
              </label>
              <input
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "At least 8 characters required",
                  },
                })}
                type="password"
                placeholder="Enter password"
                className="w-full mt-1 border outline-none border-[#CDB79E] rounded-lg px-3 py-2 bg-[#FFF8F1]/80 focus:ring-2 focus:ring-[#8B6F55]"
              />
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="text-[#5C4A3F] font-semibold"
              >
                🔐 Confirm Password
              </label>
              <input
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type="password"
                placeholder="Re-enter password"
                className="w-full mt-1 border outline-none border-[#CDB79E] rounded-lg px-3 py-2 bg-[#FFF8F1]/80 focus:ring-2 focus:ring-[#8B6F55]"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-[#92745D] to-[#6B5242] hover:from-[#7A5E4A] hover:to-[#4E3B31] text-white font-semibold py-3 rounded-xl transition-transform hover:scale-[1.02] shadow-lg hover:shadow-2xl"
          >
            {isSubmitting ? "☕ Brewing my account..." : "☕ Brew my account"}
          </button>

          {/* FOOTER */}
          <p className="text-center text-[#7A6658] text-xs italic">
            "Chai pe charcha, account pe signup!"
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
