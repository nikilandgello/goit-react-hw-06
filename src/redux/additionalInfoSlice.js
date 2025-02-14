import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenForm: false,
};

const slice = createSlice({
  name: "additionalInfo",
  initialState,
  reducers: {
    openAdditionalInfoForm: (state) => {
      state.isOpenForm = !state.isOpenForm;
    },
  },
});

export const additionalInfoReducer = slice.reducer;
export const { openAdditionalInfoForm } = slice.actions;
