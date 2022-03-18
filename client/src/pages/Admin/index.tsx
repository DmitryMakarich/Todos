import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import UserList from "../../components/UserList";
import { setUserStats } from "../../redux/user/user.actions";
import { userStats } from "../../redux/user/user.selectors";
import userService from "../../service/User";

import "./index.scss";

export default function AdminPage() {
  const dispatch = useDispatch();
  const { stats, isLoading } = useSelector(userStats);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(setUserStats());
  }, []);

  return (
    <section className="admin-page">
      <h1>Users list</h1>
      <p>created / completed</p>
      {!isLoading && stats ? (
        <>
          <UserList stats={stats} />
          <Pagination
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            className="admin-page_links"
            count={1}
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
