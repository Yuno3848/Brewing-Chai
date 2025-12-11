import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import profile from "../api/profile.api";
import toast from "react-hot-toast";
import { setCredentials } from "../../../redux/slices/auth.slice";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    const platforms = [
      "Website",
      "Facebook",
      "Instagram",
      "LinkedIn",
      "X",
      "YouTube",
    ];

    const socialLinks = platforms
      .map((label) => {
        const value = data[label];

        if (!value) return null;

        return {
          platform: label.toLowerCase(),
          url: value,
        };
      })
      .filter(Boolean);

    platforms.forEach((label) => delete data[label]);

    const payload = { ...data, socialLinks };

    console.log("payload :", payload);
    try {
      const response = await profile.updateProfile(payload);
      console.log("update profile response :", response?.message);
      if (response?.data || response?.success) {
        console.log("🎉 Signup success:", response.data);
        toast.success(response?.message || "Profile updated successfully!");
        dispatch(setCredentials({ socialLinks: response?.data?.socialLinks }));
      } else {
        console.error("❌ Signup failed:", response.error);
        toast.error(response?.error || "Failed to update profile!");
      }
    } catch (error) {
      console.log("error message :", error.message);
      toast.error("Something went wrong while updating profile!");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#F3ECDF] via-[#E3D5C3] rounded-3xl to-[#D2BFA9] py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-4xl backdrop-blur-md bg-gradient-to-b from-[#FCF6EE]/70 to-[#F0E3D3]/70 shadow-xl  rounded-3xl p-10  space-y-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <label className="text-[#5C4A3F] font-semibold">First Name</label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "At least 2 characters required",
                  },
                })}
                type="text"
                defaultValue={user?.firstName}
                placeholder="Your first name"
                className="w-full mt-1 border outline-none border-[#CDB79E] rounded-lg px-3 py-2 bg-[#FFF8F1]/80 
                focus:ring-2 focus:ring-[#8B6F55] placeholder:text-[#B79B8A]"
              />
            </div>

            <div>
              <label className="text-[#5C4A3F] font-semibold">Last Name</label>
              <input
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "At least 2 characters required",
                  },
                })}
                type="text"
                defaultValue={user?.lastName}
                placeholder="Your last name"
                className="w-full mt-1 border outline-none border-[#CDB79E] rounded-lg px-3 py-2 bg-[#FFF8F1]/80 
                focus:ring-2 focus:ring-[#8B6F55] placeholder:text-[#B79B8A]"
              />
            </div>

            <div>
              <label className="text-[#5C4A3F] font-semibold">
                📝 Biography
              </label>
              <textarea
                {...register("biography", {
                  required: "biography name is required",
                  minLength: {
                    value: 60,
                    message: "This field should be at least 60 words long.",
                  },
                })}
                placeholder="Tell people something about you..."
                className="w-full mt-1 border outline-none border-[#CDB79E] rounded-lg px-3 py-2 bg-[#FFF8F1]/80 
                focus:ring-2 focus:ring-[#8B6F55] placeholder:text-[#B79B8A] h-24 resize-none"
              ></textarea>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#5C4A3F] mb-3">
              Social Links
            </h3>

            {[
              "Website",
              "Facebook",
              "Instagram",
              "LinkedIn",
              "X",
              "YouTube",
            ].map((label, i) => (
              <div key={i}>
                <label htmlFor={label} className="text-[#5C4A3F] font-semibold">
                  {label}
                </label>
                <input
                  id={label}
                  {...register(label, {
                    validate: (value) => {
                      if (!value) return true;

                      const urlRegex = /^https?:\/\/.+/i;
                      return (
                        urlRegex.test(value) ||
                        "Please enter a valid URL (starting with http or https)"
                      );
                    },
                  })}
                  type="text"
                  placeholder={`Enter ${label} URL`}
                  className="w-full mt-1 border outline-none border-[#CDB79E] rounded-lg px-3 py-2 bg-[#FFF8F1]/80 
                  focus:ring-2 focus:ring-[#8B6F55] placeholder:text-[#B79B8A]"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center">
          <button
            type="submit"
            className="px-10 py-3 bg-gradient-to-r from-[#92745D] to-[#6B5242] 
            hover:from-[#7A5E4A] hover:to-[#4E3B31] text-white font-semibold 
            rounded-xl transition-transform hover:scale-[1.02] shadow-lg hover:shadow-2xl"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
