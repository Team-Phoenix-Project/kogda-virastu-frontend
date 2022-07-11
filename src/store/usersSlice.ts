import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUserData } from '../types/types';

type TUsersState = {
  users: TUserData[],
  usersCount: number,
};

const initialState: TUsersState = {
  users: [],
  usersCount: 0,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<TUserData[]>) => ({
      ...state, users: action.payload,
    }),
    clearAllUsers: () => ({
      ...initialState,
    }),
    updateUser: (state, action: PayloadAction<TUserData>) => ({
      ...state,
      users: state.users.map((user) => (
        user._id === action.payload._id
          ? action.payload
          : user
      )),
    }),
  },
});

const usersReducer = usersSlice.reducer;
export const { setAllUsers, clearAllUsers, updateUser } = usersSlice.actions;
export default usersReducer;
