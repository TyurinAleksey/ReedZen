import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  auth: "login" | "register";
}

const initialState: AuthState = {
  auth: "login",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleAuth: (state) => {
      state.auth = state.auth === "login" ? "register" : "login";
    },
  },
});

export const { toggleAuth } = authSlice.actions;
export default authSlice.reducer;
