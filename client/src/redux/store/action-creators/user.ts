import { Dispatch } from "react";
import { UserAction, UserActionTypes } from "../../types/user";
import userService from "../../../service/User";

export const login = (login: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.LOGIN_USER });

      const { data } = await userService.login(login, password);
      window.localStorage.setItem("accessToken", data.accessToken);

      dispatch({
        type: UserActionTypes.LOGIN_USER_SUCCESS,
        payload: {
          userId: data.userId,
          userName: data.userName,
        },
      });
    } catch (e) {
      console.log("error");

      dispatch({
        type: UserActionTypes.LOGIN_USER_ERROR,
        payload: "Неверный логин или пароль",
      });
    }
  };
};
