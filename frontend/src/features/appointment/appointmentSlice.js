import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  bookAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "./appointmentService";

const initialState = {
  appointments: [],
  loading: false,
  success: false,
  error: null,
};

// Book Appointment
export const createAppointment = createAsyncThunk(
  "appointment/createAppointment",
  async (appointmentData, thunkAPI) => {
    try {
      return await bookAppointment(appointmentData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to book appointment",
      );
    }
  },
);

// Get All Appointments
export const fetchAppointments = createAsyncThunk(
  "appointment/fetchAppointments",
  async (_, thunkAPI) => {
    try {
      return await getAppointments();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch appointments",
      );
    }
  },
);

// Update Appointment Status
export const changeAppointmentStatus = createAsyncThunk(
  "appointment/changeAppointmentStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      return await updateAppointmentStatus(id, status);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update appointment status",
      );
    }
  },
);

// Delete Appointment
export const removeAppointment = createAsyncThunk(
  "appointment/removeAppointment",
  async (id, thunkAPI) => {
    try {
      await deleteAppointment(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to delete appointment",
      );
    }
  },
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    clearAppointmentError: (state) => {
      state.error = null;
    },
    resetAppointmentSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder

      // Create Appointment
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointments.push(action.payload.data);
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Appointments
      .addCase(fetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload.data;
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Appointment Status
      .addCase(changeAppointmentStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.appointments = state.appointments.map((appointment) =>
          appointment._id === action.payload.data._id
            ? action.payload.data
            : appointment,
        );
      })
      .addCase(changeAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Appointment
      .addCase(removeAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeAppointment.fulfilled, (state, action) => {
        state.loading = false;

        state.appointments = state.appointments.filter(
          (appointment) => appointment._id !== action.payload,
        );
      })
      .addCase(removeAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAppointmentError, resetAppointmentSuccess } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
