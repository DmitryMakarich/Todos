import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Modal from "../..";
import TextInput from "../../../TextInput";

import "../index.scss";
import SelectField from "../../../SelectField";
import TagModel from "../../../../model/Tag";
import { useDispatch } from "react-redux";
import { addTodoAction } from "../../../../redux/store/action-creators/todo";

interface Props {
  onCloseHandler: Function;
  options: Array<TagModel>;
  isLoading: boolean;
}

const CreationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  tag: Yup.string().required("Required"),
});

export default function CreationForm({
  onCloseHandler,
  options,
  isLoading,
}: Props) {
  const dispatch = useDispatch();

  return (
    <Modal onCloseHandler={onCloseHandler}>
      <Formik
        initialValues={{ title: "", tag: "" }}
        validationSchema={CreationSchema}
        onSubmit={(values: { title: string; tag: string }) => {
          dispatch(addTodoAction(values.title, values.tag));
        }}
      >
        {({ handleSubmit }) => (
          <Form
            className="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Todo</h2>
            <TextInput name="title" placeholder="Title" />
            <SelectField
              name="tag"
              placeholder="Select tag"
              options={options.map((tag) => ({
                label: tag.title,
                value: tag._id,
              }))}
            />
            <button disabled={isLoading} className="form_btn" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
