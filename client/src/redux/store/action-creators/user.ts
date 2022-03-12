import { UserActionTypes } from "../../types/user";

export const loginUserAction = (email: string, password: string) => {
  return {
    type: UserActionTypes.LOGIN_USER,
    formData: {
      email,
      password,
    },
  };
};

export const registerUserAction = (
  userName: string,
  email: string,
  password: string
) => {
  return {
    type: UserActionTypes.REGISTER_USER,
    formData: {
      userName,
      email,
      password,
    },
  };
};
