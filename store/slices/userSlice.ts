import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  user_id: string | null;
  user_name: string | null;
  mobile: string | null;
};

const initialState: UserState = {
  user_id: null,
  user_name: null,
  mobile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return { ...state, ...action.payload };
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
