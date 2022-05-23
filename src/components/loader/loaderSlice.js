import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loader: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    openLoader: (state) => {
      state.loader = true;
    },
    closeLoader: (state) => {
      state.loader = false;
    },
  },
});

export const { openLoader, closeLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
