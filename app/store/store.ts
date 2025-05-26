import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slice/authSlice";
import themeReducer from "./Slice/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
