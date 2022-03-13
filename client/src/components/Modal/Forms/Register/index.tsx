import Modal from "../..";
import { Form, Formik } from "formik";

import "../index.scss";
import TextInput from "../../../TextInput";
import * as Yup from "yup";
import { UseTypeSelector } from "../../../../hooks/useTypeSelector";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { registerUserAction } from "../../../../redux/store/action-creators/user";
import CustomSnackBar from "../../../SnackBar";
import { UserActionTypes } from "../../../../redux/types/user";

interface Props {
  onCloseHandler: Function;
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

  const { error, isLogging } = UseTypeSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogging) {
      setIsOpenSnackBar(true);
      onCloseHandler();
    }
    return () => {
      dispatch({
        type: UserActionTypes.REGISTER_USER_ERROR,
        payload: null,
      });
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
