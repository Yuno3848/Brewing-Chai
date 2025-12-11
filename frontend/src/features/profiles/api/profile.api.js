const authUrl = `${import.meta.env.VITE_BACKEND_API}/auth/brewing-chai`;

const profile = {
  mailDeleteAccount: async () => {
    try {
      const res = await fetch(`${authUrl}/mail-delete-account`, {
        method: "GET",
        credentials: "include",
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Failed to send mail!");
      }
      return resData;
    } catch (error) {
      throw error;
    }
  },

  userAccountDeleted: async (otp) => {
    try {
      const res = await fetch(`${authUrl}/delete-account`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Failed to send mail!");
      }
      return resData;
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await fetch(`${authUrl}/update-profile`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Failed to send mail!");
      }
      return resData;
    } catch (error) {
      throw error;
    }
  },
};

export default profile;
