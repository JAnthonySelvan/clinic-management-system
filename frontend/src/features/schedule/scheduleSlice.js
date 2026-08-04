import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMySchedule,
  updateWeeklyAvailability,
  addBlockedDate,
  removeBlockedDate,
  getAdminLeaves,
  updateLeaveStatus,
} from "./scheduleService";
import {
  fetchAppointments,
  fetchDoctorAppointments,
} from "../appointment/appointmentSlice";

// Fetch doctor schedule
export const fetchMySchedule = createAsyncThunk(
  "schedule/fetchMySchedule",
  async (_, thunkAPI) => {
    try {
      return await getMySchedule();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch schedule",
      );
    }
  },
);

// Update weekly availability
export const updateAvailability = createAsyncThunk(
  "schedule/updateAvailability",
  async (weeklyAvailability, thunkAPI) => {
    try {
      const res = await updateWeeklyAvailability(weeklyAvailability);
      thunkAPI.dispatch(fetchMySchedule());
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update weekly availability",
      );
    }
  },
);

// Add blocked date / leave
export const createBlockedDate = createAsyncThunk(
  "schedule/createBlockedDate",
  async (blockedDateData, thunkAPI) => {
    try {
      const res = await addBlockedDate(blockedDateData);
      thunkAPI.dispatch(fetchMySchedule());
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add blocked date",
      );
    }
  },
);

// Remove blocked date / leave
export const deleteBlockedDate = createAsyncThunk(
  "schedule/deleteBlockedDate",
  async (dateId, thunkAPI) => {
    try {
      const res = await removeBlockedDate(dateId);
      thunkAPI.dispatch(fetchMySchedule());
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove blocked date",
      );
    }
  },
);

// Fetch admin doctor leaves
export const fetchAdminLeaves = createAsyncThunk(
  "schedule/fetchAdminLeaves",
  async (_, thunkAPI) => {
    try {
      return await getAdminLeaves();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch doctor leaves",
      );
    }
  },
);

// Admin update leave status
export const changeLeaveStatus = createAsyncThunk(
  "schedule/changeLeaveStatus",
  async ({ scheduleId, dateId, status }, thunkAPI) => {
    try {
      const res = await updateLeaveStatus(scheduleId, dateId, status);
      thunkAPI.dispatch(fetchAdminLeaves());
      thunkAPI.dispatch(fetchAppointments());
      thunkAPI.dispatch(fetchDoctorAppointments());
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update leave status",
      );
    }
  },
);

const initialState = {
  schedule: null,
  adminLeaves: [],
  loading: false,
  saving: false,
  error: null,
  successMessage: null,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    clearScheduleError: (state) => {
      state.error = null;
    },
    clearScheduleSuccess: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Schedule
      .addCase(fetchMySchedule.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMySchedule.fulfilled, (state, action) => {
        state.loading = false;
        state.schedule = action.payload.data;
      })
      .addCase(fetchMySchedule.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Weekly Availability
      .addCase(updateAvailability.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(updateAvailability.fulfilled, (state, action) => {
        state.saving = false;
        state.schedule = action.payload.data;
        state.successMessage = "Schedule updated successfully";
      })
      .addCase(updateAvailability.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // Add Blocked Date
      .addCase(createBlockedDate.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(createBlockedDate.fulfilled, (state, action) => {
        state.saving = false;
        state.schedule = action.payload.data;
        state.successMessage = "Blocked date added successfully";
      })
      .addCase(createBlockedDate.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // Delete Blocked Date
      .addCase(deleteBlockedDate.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(deleteBlockedDate.fulfilled, (state, action) => {
        state.saving = false;
        state.schedule = action.payload.data;
        state.successMessage = "Blocked date removed successfully";
      })
      .addCase(deleteBlockedDate.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // Fetch Admin Leaves
      .addCase(fetchAdminLeaves.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminLeaves.fulfilled, (state, action) => {
        state.loading = false;
        state.adminLeaves = action.payload.data;
      })
      .addCase(fetchAdminLeaves.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change Leave Status
      .addCase(changeLeaveStatus.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(changeLeaveStatus.fulfilled, (state, action) => {
        state.saving = false;
        const updated = action.payload.data;

        state.adminLeaves = state.adminLeaves.map((l) =>
          l.dateId === updated.dateId ? { ...l, status: updated.status } : l,
        );
        state.successMessage = `Leave status updated to ${updated.status}`;
      })
      .addCase(changeLeaveStatus.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      });
  },
});

export const { clearScheduleError, clearScheduleSuccess } =
  scheduleSlice.actions;

export default scheduleSlice.reducer;
