import Modal from "../..";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import "../index.scss";
import TextInput from "../../../TextInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomSnackBar from "../../../SnackBar";
import {
  loginUserAction,
  loginUserFailAction,
} from "../../../../redux/user/user.actions";
import { loggingInfo } from "../../../../redux/user/user.selectors";

interface Props {
  onCloseHandler: () => void;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "password should contain at least 6 symbols"),
});

function LoginForm({ onCloseHandler }: Props) {
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);

  const { error, isLogging } = useSelector(loggingInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogging) {
      onCloseHandler();
    }

    return () => {
      dispatch(loginUserFailAction(null));
    };
  }, [isLogging]);

  useEffect(() => {
    if (error) {
      setIsOpenSnackBar(true);
    }
  }, [error]);

  const openSnackBarHandler = () => {
    setIsOpenSnackBar(!isOpenSnackBar);
  };

  return (
    <Modal onCloseHandler={onCloseHandler}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values: { email: string; password: string }) => {
          dispatch(loginUserAction(values.email, values.password));
        }}
      >
        {({ handleSubmit }) => (
          <Form
            className="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Login to Todo App</h2>
            <TextInput name="email" type="email" placeholder="Email" />
            <TextInput name="password" password placeholder="Password" />
            <button className="form_btn" type="submit">
              Login
            </button>
          </Form>
        )}
      </Formik>
      <CustomSnackBar
        isOpenSnackBar={isOpenSnackBar}
        isSuccessfully={!error}
        deniedMessage={error!}
        successMessage={"Log in success"}
        snackBarHandler={openSnackBarHandler}
      />
    </Modal>
  );
}

export default LoginForm;
