import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import doctorReducer from "../features/doctor/doctorSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
  },
});

export default store;
