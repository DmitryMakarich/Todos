import Modal from "../..";
import { Form, Formik } from "formik";

import "../index.scss";
import TextInput from "../../../TextInput";
import * as Yup from "yup";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../store";
import { useDispatch } from "react-redux";
import { login } from "../../../../redux/store/action-creators/user";
import { UseTypeSelector } from "../../../../hooks/useTypeSelector";

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
  // const { userStore } = useStore();
  const { error } = UseTypeSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Modal onCloseHandler={onCloseHandler}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(
          values: { email: string; password: string },
          { setErrors }
        ) => {
          dispatch(login(values.email, values.password));

          console.log("error", error);

          if (error) {
            console.log("from if");

            setErrors({ password: error });
            // return;
          }

          // onCloseHandler();

          // userStore
          //   .login(values.email, values.password)
          //   .then(() => onCloseHandler())
          //   .catch(() => setErrors({ password: "Неверный логин или пароль" }));
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
    </Modal>
  );
}

export default LoginForm;
