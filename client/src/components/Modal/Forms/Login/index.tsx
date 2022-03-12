import Modal from "../..";
import { Form, Formik } from "formik";

import "../index.scss";
import TextInput from "../../../TextInput";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginUserAction } from "../../../../redux/store/action-creators/user";
import { UseTypeSelector } from "../../../../hooks/useTypeSelector";
import { useEffect, useState } from "react";
import CustomSnackBar from "../../../SnackBar";

interface Props {
  onCloseHandler: Function;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "password should contain at least 6 symbols"),
});

function LoginForm({ onCloseHandler }: Props) {
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);

  const { error, isLogging } = UseTypeSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogging) {
      onCloseHandler();
    }
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
