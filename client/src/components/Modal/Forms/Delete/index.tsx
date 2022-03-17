import React from "react";
import { Form, Formik } from "formik";
import Modal from "../..";

interface Props {
  onCloseHandler: () => void;
  id: string;
  deleteHandler: (id: string) => void;
  snackBarHandler: () => void;
  actionHandler: (result: boolean) => void;
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
          deleteHandler(values.id);
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
