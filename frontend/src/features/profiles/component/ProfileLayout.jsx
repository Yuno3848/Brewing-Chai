import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import AccountSecurity from "../pages/AccountSecurity";

const ProfileLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#E7D7C5] text-[#5D4037] font-sans items-center">
      <div className="w-[320px] bg-[#F4E8D6] border-r border-[#D0BFAF] p-6 shadow-xl rounded-tr-3xl rounded-br-3xl flex flex-col mt-5 mb-5">
        <Sidebar />
      </div>

      <div className="flex-1 p-8">
        <div className="bg-[#FFF8F3] shadow-md rounded-3xl p-8 min-h-[calc(100vh-4rem)] flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
