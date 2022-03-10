import { Form, Formik } from "formik";
import React from "react";
import Modal from "../..";
import TodoModel from "../../../../model/Todo";

interface Props {
  onCloseHandler: Function;
  id: string;
  deleteHandler: (id: string) => Promise<string>;
  snackBarHandler: Function;
  actionHandler: Function;
}

export default function DeleteForm({
  onCloseHandler,
  id,
  deleteHandler,
  actionHandler,
  snackBarHandler,
}: Props) {
  return (
    <Modal onCloseHandler={onCloseHandler}>
      <Formik
        initialValues={{ id }}
        onSubmit={(values: { id: string }) => {
          deleteHandler(values.id).then(() => {
            actionHandler(true);
            snackBarHandler();
            onCloseHandler();
          });
        }}
        onReset={() => {
          actionHandler(false);
          snackBarHandler();
          onCloseHandler();
        }}
      >
        {({ handleSubmit }) => (
          <Form
            className="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Are you sure you want to delete todo?</h2>
            <div className="form_btn-block">
              <button className="form_btn" type="submit">
                Yes
              </button>
              <button className="form_btn" type="reset">
                No
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
