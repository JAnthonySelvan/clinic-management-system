import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import otpService from "./otpService";

const initialOtpToken = sessionStorage.getItem("otpToken") || null;
const initialVerifiedEmail = sessionStorage.getItem("verifiedEmail") || "";

const initialState = {
  email: initialVerifiedEmail,
  otpToken: initialOtpToken,
  verified: Boolean(initialOtpToken),
  otpSent: false,
  sending: false,
  verifying: false,
  error: null,
};

export const requestOtp = createAsyncThunk(
  "otp/requestOtp",
  async (email, thunkAPI) => {
    try {
      return await otpService.sendOtp(email);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to send verification code";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const confirmOtp = createAsyncThunk(
  "otp/confirmOtp",
  async ({ email, otp }, thunkAPI) => {
    try {
      const response = await otpService.verifyOtp(email, otp);
      if (response.success && response.data?.otpToken) {
        sessionStorage.setItem("otpToken", response.data.otpToken);
        sessionStorage.setItem("verifiedEmail", email);
      }
      return { ...response, email };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Invalid or expired verification code";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const otpSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    clearOtpError: (state) => {
      state.error = null;
    },
    resetOtpState: (state) => {
      state.otpSent = false;
      state.error = null;
    },
    logoutOtp: (state) => {
      sessionStorage.removeItem("otpToken");
      sessionStorage.removeItem("verifiedEmail");
      state.email = "";
      state.otpToken = null;
      state.verified = false;
      state.otpSent = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // requestOtp
      .addCase(requestOtp.pending, (state) => {
        state.sending = true;
        state.error = null;
      })
      .addCase(requestOtp.fulfilled, (state, action) => {
        state.sending = false;
        state.otpSent = true;
        state.email = action.meta.arg;
      })
      .addCase(requestOtp.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload;
      })
      // confirmOtp
      .addCase(confirmOtp.pending, (state) => {
        state.verifying = true;
        state.error = null;
      })
      .addCase(confirmOtp.fulfilled, (state, action) => {
        state.verifying = false;
        state.verified = true;
        state.otpToken = action.payload.data.otpToken;
        state.email = action.payload.email;
      })
      .addCase(confirmOtp.rejected, (state, action) => {
        state.verifying = false;
        state.error = action.payload;
      });
  },
});

export const { setEmail, clearOtpError, resetOtpState, logoutOtp } = otpSlice.actions;
export default otpSlice.reducer;
