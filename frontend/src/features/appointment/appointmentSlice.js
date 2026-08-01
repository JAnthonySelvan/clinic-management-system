import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  bookAppointment,
  getAppointments,
  getDoctorAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "./appointmentService";

// ==============================
// Book Appointment
// ==============================
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

// ==============================
// Fetch Appointments
// ==============================
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

// ==============================
// Change Appointment Status
// ==============================
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

// ==============================
// Delete Appointment
// ==============================
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

export const fetchDoctorAppointments = createAsyncThunk(
  "appointment/fetchDoctorAppointments",
  async (_, thunkAPI) => {
    try {
      return await getDoctorAppointments();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctor appointments",
      );
    }
  },
);

const initialState = {
  appointments: [],
  doctorAppointments: [],
  loading: false,
  success: false,
  error: null,
};
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

      // ==========================
      // Create Appointment
      // ==========================
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

      // ==========================
      // Fetch Appointments
      // ==========================
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

      // ==========================
      // Change Appointment Status
      // ==========================
      .addCase(changeAppointmentStatus.pending, (state) => {
        state.loading = true;
      })

      .addCase(changeAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.data;

        state.appointments = state.appointments.map((appointment) =>
          appointment._id === updated._id ? updated : appointment,
        );

        state.doctorAppointments = state.doctorAppointments.map((appointment) =>
          appointment._id === updated._id ? updated : appointment,
        );
      })

      .addCase(changeAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ==========================
      // Delete Appointment
      // ==========================
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
      })

      .addCase(fetchDoctorAppointments.pending, (state) => {
  state.loading = true;
  state.error = null;
})

      .addCase(fetchDoctorAppointments.fulfilled, (state, action) => {
  state.loading = false;
  state.doctorAppointments = action.payload.data;
})

      .addCase(fetchDoctorAppointments.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
  },
});

export const { clearAppointmentError, resetAppointmentSuccess } =
  appointmentSlice.actions;

export default appointmentSlice.reducer;
