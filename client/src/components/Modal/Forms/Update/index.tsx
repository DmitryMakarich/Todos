import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Modal from "../..";
import TextInput from "../../../TextInput";

import "../index.scss";
import SelectField from "../../../SelectField";
import TagModel from "../../../../model/Tag";
import TodoModel from "../../../../model/Todo";

interface Props {
  onCloseHandler: () => void;
  options: Array<TagModel>;
  todo: TodoModel;
  updateHandler: (updateTodo: TodoModel) => void;
}

const CreationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  tag: Yup.string().required("Required"),
});

export default function UpdateForm({
  onCloseHandler,
  options,
  updateHandler,
  todo,
}: Props) {
  return (
    <Modal onCloseHandler={onCloseHandler}>
      <Formik
        initialValues={{ title: todo.title, tag: todo.tag }}
        validationSchema={CreationSchema}
        onSubmit={(values: { title: string; tag: string }) => {
          updateHandler({ ...todo, title: values.title, tag: values.tag });
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
            <TextInput name="title" placeholder="Title" value={todo.title} />
            <SelectField
              name="tag"
              placeholder="Select tag"
              value={todo.tag}
              options={options.map((tag) => ({
                label: tag.title,
                value: tag._id,
              }))}
            />
            <button className="form_btn" type="submit">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
