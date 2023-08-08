//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postLogin } from "../../../helpers/fakebackend_helper";

import {
  loginSuccess,
  logoutUserSuccess,
  apiError,
  reset_login_flag,
  showLoader,
  hideLoader,
} from "./reducer";

export const loginUser = (user, history) => async (dispatch) => {
  dispatch(showLoader());

  try {
    let response = postLogin({
      userName: user.username || "",
      password: user.password || "",
      requestFrom: "admin",
      userCase: "login",
    });

    var data = await response;

    if (data) {
      localStorage.setItem(
        "authUser",
        JSON.stringify({ userName: user.username })
      );
      dispatch(loginSuccess(data));
      history("/dashboard");
    } else {
      dispatch(apiError(data));
    }
    dispatch(hideLoader(data));
  } catch (error) {
    dispatch(apiError(error));
    dispatch(hideLoader(data));
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    localStorage.removeItem("authUser");
    dispatch(logoutUserSuccess(true));
    window.location.reload();
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};
