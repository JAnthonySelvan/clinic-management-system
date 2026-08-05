import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import patientProfileService from "./patientProfileService";

const initialState = {
  familyProfiles: null,
  activeProfile: null,
  history: [],
  loading: false,
  saving: false,
  error: null,
  success: false,
};

export const fetchFamilyProfiles = createAsyncThunk(
  "patientProfile/fetchFamilyProfiles",
  async (_, thunkAPI) => {
    try {
      const response = await patientProfileService.getFamilyProfiles();
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load family profiles";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const saveProfile = createAsyncThunk(
  "patientProfile/saveProfile",
  async (profileData, thunkAPI) => {
    try {
      const response = await patientProfileService.upsertProfile(profileData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to save profile";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchPatientHistory = createAsyncThunk(
  "patientProfile/fetchPatientHistory",
  async (_, thunkAPI) => {
    try {
      const response = await patientProfileService.getPatientHistory();
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to load appointment history";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const patientProfileSlice = createSlice({
  name: "patientProfile",
  initialState,
  reducers: {
    setActiveProfile: (state, action) => {
      state.activeProfile = action.payload;
    },
    clearProfileError: (state) => {
      state.error = null;
    },
    resetProfileSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchFamilyProfiles
      .addCase(fetchFamilyProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFamilyProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.familyProfiles = action.payload;
        // Default active profile to "self" if available
        if (action.payload?.self && !state.activeProfile) {
          state.activeProfile = action.payload.self;
        }
      })
      .addCase(fetchFamilyProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // saveProfile
      .addCase(saveProfile.pending, (state) => {
        state.saving = true;
        state.error = null;
        state.success = false;
      })
      .addCase(saveProfile.fulfilled, (state, action) => {
        state.saving = false;
        state.success = true;
        state.activeProfile = action.payload;
      })
      .addCase(saveProfile.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      // fetchPatientHistory
      .addCase(fetchPatientHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchPatientHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setActiveProfile, clearProfileError, resetProfileSuccess } =
  patientProfileSlice.actions;
export default patientProfileSlice.reducer;
