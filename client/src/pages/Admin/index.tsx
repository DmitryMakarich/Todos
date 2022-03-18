import { Pagination } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import TextInput from "../../components/TextInput";
import UserList from "../../components/UserList";
import { LIMIT_COUNT } from "../../constants/todo.constants";
import {
  setPage,
  setUserName,
  setUserStats,
} from "../../redux/stats/stats.actions";
import { userStats } from "../../redux/stats/stats.selectors";

import "./index.scss";

export default function AdminPage() {
  const dispatch = useDispatch();
  const { stats, isLoading, currentPage, totalPages, userName } =
    useSelector(userStats);

  useEffect(() => {
    dispatch(setUserStats(currentPage, LIMIT_COUNT, userName));
  }, [currentPage, userName]);

  return (
    <section className="admin-page">
      <h1>Users list</h1>
      <p>created / completed</p>
      <Formik
        initialValues={{ userName: "" }}
        onSubmit={(values: { userName: string }) => {
          dispatch(setUserName(values.userName));
        }}
        onReset={() => {
          dispatch(setUserName(null));
        }}
      >
        {({ handleSubmit }) => (
          <Form className="admin-page_search" onSubmit={handleSubmit}>
            <TextInput name="userName" placeholder="User name" />
            <button disabled={isLoading} className="" type="submit">
              Submit
            </button>
            <button disabled={isLoading} className="" type="reset">
              Reset
            </button>
          </Form>
        )}
      </Formik>
      {!isLoading && stats ? (
        <>
          <UserList stats={stats} />
          <Pagination
            page={currentPage}
            onChange={(_, value) => dispatch(setPage(value))}
            className="admin-page_links"
            count={totalPages}
            color="primary"
            hidePrevButton
            hideNextButton
            style={{ color: "white" }}
          />
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}
