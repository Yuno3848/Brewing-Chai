import React from "react";
import { useSelector } from "react-redux";
import { Mail, User2, Pencil } from "lucide-react";

const PublicProfile = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#F7F2E9] via-[#E8DCC9] to-[#D1B89F] py-14 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT SECTION - Profile Overview & Courses */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Header Card */}
          <div className="p-8 rounded-3xl border border-[#CBB39A] bg-gradient-to-b from-white/70 to-[#F4EADF]/70 backdrop-blur-xl shadow-xl">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-[#4D4036] text-white flex items-center justify-center text-3xl font-bold uppercase flex-shrink-0">
                {user.firstName?.[0] ?? <User2 />}
              </div>

              {/* Name & Role */}
              <div className="flex-1 min-w-0">
                <h1 className="text-3xl font-bold text-[#5A463A] capitalize truncate">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="uppercase text-xs tracking-wider text-[#806855] mt-1">
                  {user.role || "Learner"}
                </p>
              </div>

              {/* Edit Button - Desktop */}
              <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-[#5A463A] text-white rounded-lg hover:bg-[#493C33] transition-all shadow-lg hover:shadow-xl">
                <Pencil size={16} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Courses Section */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#5A463A]">
              My Courses
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Placeholder for courses */}
              <div className="h-48 flex flex-col items-center justify-center bg-white/70 rounded-2xl border border-[#CBB39A] text-[#6C5848] hover:shadow-lg transition-shadow">
                <p className="text-sm font-medium">No courses yet</p>
                <p className="text-xs text-[#9B8579] mt-1">
                  Start learning today
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION - Profile Details */}
        <div className="space-y-6">
          {/* About Card */}
          <div className="p-6 rounded-3xl border border-[#CBB39A] bg-gradient-to-b from-white/70 to-[#F4EADF]/70 backdrop-blur-xl shadow-xl space-y-6">
            <h3 className="text-lg font-semibold text-[#5A463A]">About</h3>

            {/* Biography */}
            {user.biography && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-[#806855] uppercase tracking-wide">
                  Biography
                </h4>
                <p className="text-sm text-[#6C574B] leading-relaxed break-words whitespace-pre-line">
                  {user.biography}
                </p>
              </div>
            )}

            {/* Email */}
            {user.email && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-[#806855] uppercase tracking-wide">
                  Email
                </h4>
                <div className="flex items-center gap-2 text-sm text-[#6C574B]">
                  <Mail size={16} className="flex-shrink-0" />
                  <span className="break-all">{user.email}</span>
                </div>
              </div>
            )}

            {/* Social Links */}
            {user.socialLinks?.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-[#806855] uppercase tracking-wide">
                  Social Links
                </h4>
                <div className="space-y-2">
                  {user.socialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-[#6C574B] hover:text-[#493C33] underline underline-offset-2 transition-colors"
                    >
                      {link.platform}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Edit Button - Mobile */}
          <button className="sm:hidden w-full py-3 bg-[#5A463A] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#493C33] transition-all shadow-lg hover:shadow-xl">
            <Pencil size={16} />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
