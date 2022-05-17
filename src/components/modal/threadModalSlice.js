import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  threadModal: false,
  threadInfo: {},
};

const threadModalSlice = createSlice({
  name: "threadModal",
  initialState,
  reducers: {
    openThreadModal: (state, action) => {
      state.threadModal = true;
      state.threadInfo = action?.payload?.thread;
      state.threadTabIndex = action?.payload?.tabIndex;
    },
    closeThreadModal: (state) => {
      state.threadModal = false;
      state.threadInfo = {};
      state.threadTabIndex = 1;
    },
  },
});

export const { openThreadModal, closeThreadModal } = threadModalSlice.actions;
export default threadModalSlice.reducer;
