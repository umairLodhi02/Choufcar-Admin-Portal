import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  user: {},
  error: "",
  loading: false,
  isUserLogout: false,
  errorMsg: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    showLoader(state, action) {
      state.loading = true;
    },
    hideLoader(state, action) {
      state.loading = false;
    },
    apiError(state, action) {
      state.isUserLogout = false;
      state.errorMsg = true;
      state.error = action.payload;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.errorMsg = false;
    },
    logoutUserSuccess(state, action) {
      state.isUserLogout = true;
    },
    reset_login_flag(state) {
      state.error = null;
      state.errorMsg = false;
    },
  },
});

export const {
  apiError,
  loginSuccess,
  logoutUserSuccess,
  reset_login_flag,
  showLoader,
  hideLoader,
} = loginSlice.actions;

export default loginSlice.reducer;
