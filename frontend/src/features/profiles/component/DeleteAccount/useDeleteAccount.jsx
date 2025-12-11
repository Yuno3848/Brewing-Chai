import { useState } from "react";
import toast from "react-hot-toast";
import profile from "../../api/profile.api";

const useDeleteAccount = () => {
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = async () => {
    try {
      const res = await profile.mailDeleteAccount();
      if (res?.success) {
        toast.success(res?.message || "OTP brewed successfully");
        setOtpSent(true);
      } else {
        toast.error(res?.error || "Failed to send OTP");
      }
    } catch {
      toast.error("Oops! Something went wrong while sending OTP");
    }
  };

  const confirmDelete = async (otp) => {
    try {
      const res = await profile.userAccountDeleted(otp);
      if (res?.success) {
        toast.success(res?.message || "Account deleted successfully!");
      } else {
        toast.error(res?.error || "Failed to delete Account");
      }
    } catch {
      toast.error("Oops! Something went wrong while deleting Account");
    }
  };

  return { otpSent, sendOtp, confirmDelete };
};

export default useDeleteAccount;
