import React from "react";
import { useForm } from "react-hook-form";
import useDeleteAccount from "../component/DeleteAccount/useDeleteAccount";

const DeleteAccount = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitting },
  } = useForm();
  const { otpSent, sendOtp, confirmDelete } = useDeleteAccount();

  return (
    <form
      onSubmit={handleSubmit(() =>
        otpSent ? confirmDelete(getValues("otp")) : sendOtp()
      )}
      className="w-full max-w-md mx-auto text-center mt-10"
    >
      <div className="flex flex-col justify-center items-center gap-4">
        <p className="text-[#8B6F55] font-medium">
          To proceed with deleting your account, please click the button below
          to receive an OTP for verification.
        </p>

        {otpSent ? (
          <div className="flex flex-col items-center gap-3 w-full">
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              {...register("otp", { required: true })}
              className="w-2/4 text-center tracking-widest py-2 px-4 border rounded-full outline-none focus:ring-2 focus:ring-[#A8896A] transition"
            />
            <p className="text-sm text-gray-400">
              Didn't receive OTP?{" "}
              <span
                className="text-[#A8896A] underline cursor-pointer"
                onClick={sendOtp}
              >
                Resend
              </span>
            </p>
            <button
              disabled={isSubmitting}
              type="submit"
              className={`rounded-full py-2 px-6 w-2/4 transition shadow-sm active:scale-95 ${
                isSubmitting
                  ? "bg-red-400 text-white cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {isSubmitting ? "Deleting..." : "Confirm Delete"}
            </button>
          </div>
        ) : (
          <button
            disabled={isSubmitting}
            type="submit"
            className={`rounded-full py-2 px-6 w-2/4 transition shadow-sm active:scale-95 ${
              isSubmitting
                ? "bg-[#C4B5A3] text-white cursor-not-allowed"
                : "bg-[#A8896A] text-white hover:bg-[#8B6F55]"
            }`}
          >
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </button>
        )}
      </div>
    </form>
  );
};

export default DeleteAccount;
