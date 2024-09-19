import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filledSkills: [],
};

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    setFilledSkills: (state, action) => {
      state.filledSkills = action.payload;
    },
  },
});

export const { setFilledSkills } = skillsSlice.actions;
export default skillsSlice.reducer;
