import Modal from "../..";
import * as Yup from "yup";
import { Form, Formik } from "formik";

import "../index.scss";
import TextInput from "../../../TextInput";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomSnackBar from "../../../SnackBar";
import {
  registerUserAction,
  registerUserFailAction,
} from "../../../../redux/user/user.actions";
import { loggingInfo } from "../../../../redux/user/user.selectors";

interface Props {
  onCloseHandler: () => void;
}

const LoginSchema = Yup.object().shape({
  userName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "password should contain at least 6 symbols"),
});

function RegisterForm({ onCloseHandler }: Props) {
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);

  const { error, isLogging } = useSelector(loggingInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogging) {
      setIsOpenSnackBar(true);
      onCloseHandler();
    }
    return () => {
      dispatch(registerUserFailAction(null));
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
        initialValues={{ userName: "", email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values: {
          email: string;
          password: string;
          userName: string;
        }) => {
          dispatch(
            registerUserAction(values.userName, values.email, values.password)
          );
        }}
      >
        {({ handleSubmit }) => (
          <Form
            className="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Sign up to Todo App</h2>
            <TextInput name="userName" placeholder="Name" />
            <TextInput name="email" placeholder="Email" />
            <TextInput name="password" password placeholder="Password" />
            <button className="form_btn" type="submit">
              Register
            </button>
          </Form>
        )}
      </Formik>
      <CustomSnackBar
        isOpenSnackBar={isOpenSnackBar}
        isSuccessfully={!error}
        deniedMessage={error!}
        successMessage={"User created"}
        snackBarHandler={openSnackBarHandler}
      />
    </Modal>
  );
}

export default RegisterForm;
