import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TRegisterFormState = {
  username: string | null,
  usernameErrMsg: string | null,
  usernameErr: boolean | null,
  email: string | null,
  emailErrMsg: string | null,
  emailErr: boolean | null,
  password: string | null,
  passwordErrMsg: string | null,
  passwordErr: boolean | null,
  confirmPassword: string | null,
  nickname: string | null,
  nicknameErrMsg: string | null,
  nicknameErr: boolean | null,
  invitionCode: string | null,
  invitionCodeErrMsg: string | null,
  invitionCodeErr: boolean | null,
};

const initialState: TRegisterFormState = {
  username: null,
  usernameErrMsg: null,
  usernameErr: null,
  email: null,
  emailErrMsg: null,
  emailErr: null,
  password: null,
  passwordErrMsg: null,
  passwordErr: null,
  confirmPassword: null,
  nickname: null,
  nicknameErrMsg: null,
  nicknameErr: null,
  invitionCode: null,
  invitionCodeErrMsg: null,
  invitionCodeErr: null,
};

const registerFormSubSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    changeUsernameRegister: (
      state,
      action: PayloadAction<string>,
    ) => ({ ...state, username: action.payload }),
    changeUsernameErrMsg: (
      state,
      action: PayloadAction<string>,
    ) => ({ ...state, usernameErrMsg: action.payload }),
    changeUsernameErr: (
      state,
      action: PayloadAction<boolean>,
    ) => ({ ...state, usernameErr: action.payload }),
    changeEmailRegister: (
      state,
      action : PayloadAction<string>,
    ) => ({ ...state, email: action.payload }),
    changeEmailErrMsg: (
      state,
      action : PayloadAction<string>,
    ) => ({ ...state, emailErrMsg: action.payload }),
    changeEmailErr: (
      state,
      action : PayloadAction<boolean>,
    ) => ({ ...state, emailErr: action.payload }),
    changePasswordRegister: (state, action: PayloadAction<string>) => ({
      ...state, password: action.payload,
    }),
    changePasswordErrMsg: (state, action: PayloadAction<string>) => ({
      ...state, passwordErrMsg: action.payload,
    }),
    changePasswordErr: (state, action: PayloadAction<boolean>) => ({
      ...state, passwordErr: action.payload,
    }),
    changeConfirmPasswordRegister: (state, action: PayloadAction<string>) => ({
      ...state, confirmPassword: action.payload,
    }),
    changeNicknameRegister: (state, action: PayloadAction<string>) => ({
      ...state, nickname: action.payload,
    }),
    changeNicknameErrMsg: (state, action: PayloadAction<string>) => ({
      ...state, nicknameErrMsg: action.payload,
    }),
    changeNicknameErr: (state, action: PayloadAction<boolean>) => ({
      ...state, nicknameErr: action.payload,
    }),
    changeInvitionCode: (state, action: PayloadAction<string>) => ({
      ...state, invitionCode: action.payload,
    }),
    changeInvitionCodeErrMsg: (state, action: PayloadAction<string>) => ({
      ...state, invitionCodeErrMsg: action.payload,
    }),
    changeInvitionCodeErr: (state, action: PayloadAction<boolean>) => ({
      ...state, invitionCodeErr: action.payload,
    }),
    resetFormRegister: (state) => ({
      ...state, ...initialState,
    }),
  },
});

const registerReducer = registerFormSubSlice.reducer;
export const {
  changeUsernameRegister,
  changeUsernameErrMsg,
  changeUsernameErr,
  changeEmailRegister,
  changeEmailErrMsg,
  changeEmailErr,
  changePasswordRegister,
  changePasswordErrMsg,
  changePasswordErr,
  changeConfirmPasswordRegister,
  changeNicknameRegister,
  changeNicknameErrMsg,
  changeNicknameErr,
  changeInvitionCode,
  changeInvitionCodeErrMsg,
  changeInvitionCodeErr,
  resetFormRegister,
} = registerFormSubSlice.actions;
export default registerReducer;
