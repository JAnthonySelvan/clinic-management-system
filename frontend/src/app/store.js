import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import doctorReducer from "../features/doctor/doctorSlice";
import appointmentReducer from "../features/appointment/appointmentSlice";
import scheduleReducer from "../features/schedule/scheduleSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    appointment: appointmentReducer,
    schedule: scheduleReducer,
  },
});

export default store;
