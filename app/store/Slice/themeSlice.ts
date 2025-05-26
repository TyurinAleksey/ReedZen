import { createSlice } from "@reduxjs/toolkit";

export interface themeState {
  theme: "light" | "dark";
}

const initialState: themeState = {
  theme: "dark",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    isTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export const { isTheme } = themeSlice.actions;
export default themeSlice.reducer;
