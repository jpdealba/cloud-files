import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isVisible: false,
    data: {},
  },
  reducers: {
    toggleVisible: (state, { type, payload }) => {
      if (!payload) {
        state.data = {};
      }
      state.isVisible = payload;
    },
    setData: (state, { type, payload }) => {
      state.data = payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleVisible, setData } = modalSlice.actions;

export default modalSlice.reducer;
