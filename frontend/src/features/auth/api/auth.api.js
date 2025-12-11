const authUrl = `${import.meta.env.VITE_BACKEND_API}/auth/brewing-chai`;

const auth = {
  signUp: async (data) => {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);

      if (data.avatar && data.avatar[0]) {
        formData.append("avatar", data.avatar[0]);
      }
      const res = await fetch(`${authUrl}/signUp`, {
        method: "POST",
        body: formData,
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(response.message || "Failed to sign up");
      }

      return { data: responseData };
    } catch (error) {
      return { error: error.message };
    }
  },

  signIn: async (data) => {
    try {
      const res = await fetch(`${authUrl}/signIn`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || "Failed to sign up");
      }
      return { resData };
    } catch (error) {
      return { error: error.message };
    }
  },

  forgotPassword: async (data) => {
    try {
      const res = await fetch(`${authUrl}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || "Failed to forgot password");
      }
      return { data: resData.message };
    } catch (error) {
      return { error: error.message };
    }
  },

  verifyEmail: async (token) => {
    try {
      const res = await fetch(`${authUrl}/verify-email/${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || "Failed to verify email");
      }
      return { data: resData.message };
    } catch (error) {
      return { error: error.message };
    }
  },

  resetPassword: async (token, data) => {
    try {
      const res = await fetch(`${authUrl}/reset-password/${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || "Failed to reset password");
      }
      return { data: resData.message };
    } catch (error) {
      return { error: error.message };
    }
  },

  resendVerifyEmail: async (email) => {
    try {
      const res = await fetch(`${authUrl}/resend-verify-email`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.message || "Failed to resend email");
      }
      return { data: resData.message };
    } catch (error) {
      return { error: error.message };
    }
  },

  me: async () => {
    try {
      const res = await fetch(`${authUrl}/me`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to fetch user details");

      return data;
    } catch (error) {
      throw error;
    }
  },

  changePassword: async (data) => {
    try {
      const res = await fetch(`${authUrl}/change-password`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Failed to change password!");
      }
      return resData;
    } catch (error) {
      throw error;
    }
  },

  updateAvatar: async (data) => {
    try {
      const formData = new FormData();
      formData.append("avatar", data.avatar[0]);

      const res = await fetch(`${authUrl}/update-avatar`, {
        method: "PATCH",
        credentials: "include",

        body: formData,
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Failed to change avatar!");
      }
      return resData;
    } catch (error) {
      return { error: error.message };
    }
  },

};

export default auth;
