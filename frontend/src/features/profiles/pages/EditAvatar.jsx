import React from "react";
import { useForm } from "react-hook-form";
import auth from "../../auth/api/auth.api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../../redux/slices/auth.slice";

const EditAvatar = () => {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  const avatarFile = watch("avatar")?.[0];

  const onSubmit = async (data) => {
    if (!avatarFile) {
      toast.error("Please pick a cute avatar first 🥹");
      return;
    }

    try {
      const response = await auth.updateAvatar(data);
      console.log("response :", response);
      if (response?.success && response?.data) {
        dispatch(setCredentials({ avatar: response?.data?.avatar }));
        toast.success(response?.message || "Avatar brewed successfully");
        reset();
      } else {
        toast.error(response?.error || "Failed to update avatar ");
      }
    } catch (error) {
      toast.error("Oops! Something went wrong while updating ");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md mx-auto">
      <div className="flex flex-col justify-center items-center gap-4">
        <div
          className="
            w-2/4 h-52 border border-[#E2C8AE] 
            flex justify-center items-center 
            overflow-hidden rounded-2xl bg-[#F9F5F2] 
            shadow-sm hover:shadow-md transition duration-200
          "
        >
          {avatarFile ? (
            <img
              src={URL.createObjectURL(avatarFile)}
              alt="Avatar Preview"
              className="object-cover w-full h-full"
              onLoad={() => URL.revokeObjectURL(avatarFile)}
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-[#B89B7A]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 animate-pulse"
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
              <p className="text-sm font-medium">Your avatar goes here</p>
            </div>
          )}
        </div>

        <input
          type="file"
          id="avatar"
          accept="image/*"
          hidden
          {...register("avatar", {
            required: "Avatar is required",
            validate: (fileList) =>
              fileList[0]?.type.startsWith("image/") ||
              "Only image files are allowed",
          })}
        />

        <label
          htmlFor="avatar"
          className="
            cursor-pointer text-center 
            border-2 border-[#D9B89B] 
            rounded-full py-2 px-5 w-2/4 
            bg-white hover:bg-[#F5E7DD] active:scale-95 
            transition shadow-sm 
            font-medium text-[#8B6F55]
          "
        >
          {avatarFile ? "Pick another ✨" : "Choose File 📁"}
        </label>

        {errors.avatar && (
          <p className="text-red-400 text-sm">{errors.avatar.message}</p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className={`
          mt-5 w-full rounded-full py-2 font-semibold transition
          shadow-sm active:scale-95
          ${
            isSubmitting
              ? "bg-[#C4B5A3] text-white cursor-not-allowed"
              : "bg-[#A8896A] text-white hover:bg-[#8B6F55]"
          }
        `}
      >
        {isSubmitting ? "Brewing avatar... " : "Brew my avatar"}
      </button>
    </form>
  );
};

export default EditAvatar;
