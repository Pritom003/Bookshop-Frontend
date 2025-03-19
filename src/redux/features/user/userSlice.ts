import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../auth/authSlice";
// import { User } from "./userApi";

interface UsersState {
  users: TUser[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<TUser[]>) => {
      state.users = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUsers, setError, setLoading } = usersSlice.actions;
export default usersSlice.reducer;
