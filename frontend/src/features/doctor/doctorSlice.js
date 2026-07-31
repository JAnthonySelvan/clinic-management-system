import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDoctors,
  getPublicDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "./doctorService";

const initialState = {
  doctors: [],
  loading: false,
  error: null,
};

// Get All Doctors (admin dashboard)
export const fetchDoctors = createAsyncThunk(
  "doctor/fetchDoctors",
  async (_, thunkAPI) => {
    try {
      return await getDoctors();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctors",
      );
    }
  },
);

// Get Public Doctors (website / appointment booking)
export const fetchPublicDoctors = createAsyncThunk(
  "doctor/fetchPublicDoctors",
  async (_, thunkAPI) => {
    try {
      return await getPublicDoctors();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctors",
      );
    }
  },
);

export const addDoctor = createAsyncThunk(
  "doctor/addDoctor",
  async (doctorData, thunkAPI) => {
    try {
      return await createDoctor(doctorData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create doctor",
      );
    }
  },
);

export const editDoctor = createAsyncThunk(
  "doctor/editDoctor",
  async ({ id, doctorData }, thunkAPI) => {
    try {
      return await updateDoctor(id, doctorData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update doctor",
      );
    }
  },
);

export const removeDoctor = createAsyncThunk(
  "doctor/removeDoctor",
  async (id, thunkAPI) => {
    try {
      await deleteDoctor(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete doctor",
      );
    }
  },
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    clearDoctorError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Doctors (admin)
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [];
      })
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Public Doctors (website)
      .addCase(fetchPublicDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [];
      })
      .addCase(fetchPublicDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // Add Doctor
      .addCase(addDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(addDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors.push(action.payload.data);
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit Doctor
      .addCase(editDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(editDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = state.doctors.map((doctor) =>
          doctor._id === action.payload.data._id ? action.payload.data : doctor,
        );
      })
      .addCase(editDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Doctor
      .addCase(removeDoctor.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = state.doctors.filter(
          (doctor) => doctor._id !== action.payload,
        );
      })
      .addCase(removeDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDoctorError } = doctorSlice.actions;
export default doctorSlice.reducer;
