import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import auth from "../../features/auth/api/auth.api";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isError: false,
};

export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await auth.me();
      return response.data;
    } catch (error) {
      return rejectWithValue(error || "failed to fetch user!");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout: () => ({ ...initialState }),
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    });

    builder.addCase(fetchMe.pending, (state, action) => {
      state.isLoading = true;
    });

    builder.addCase(fetchMe.rejected, (state, action) => {
      console.log("fetch error :", action.payload);
      state.isError = true;
      state.isLoading = false;
      state.user = null;
    });
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
