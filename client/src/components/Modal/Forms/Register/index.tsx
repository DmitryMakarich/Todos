import Modal from "../..";
import { Form, Formik } from "formik";

import "../index.scss";
import TextInput from "../../../TextInput";
import * as Yup from "yup";
import { useStore } from "../../../../store";
import { observer } from "mobx-react-lite";

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
  const { userStore } = useStore();

  return (
    <Modal onCloseHandler={onCloseHandler}>
      <Formik
        initialValues={{ userName: "", email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(
          values: {
            email: string;
            password: string;
            userName: string;
          },
          { setErrors }
        ) => {
          userStore
            .register(values.email, values.password, values.userName)
            .then(() => onCloseHandler())
            .catch(() =>
              setErrors({ password: "Такой пользователь уже существует" })
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
    </Modal>
  );
}

export default observer(RegisterForm);
