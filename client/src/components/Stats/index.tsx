import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getStatsAction } from "../../redux/todo/todo.actions";
import { getStats, getLoadingStatus } from "../../redux/todo/todo.selectors";

import "./index.scss";

interface Props {
  selectedTags: Array<string>;
}

export default function Stats({ selectedTags }: Props) {
  const { completed, created } = useSelector(getStats);
  const { isLoading } = useSelector(getLoadingStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatsAction(selectedTags));
  }, [isLoading, selectedTags]);

  return (
    <div className="stats-table">
      <table>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Day</th>
            <th>Week</th>
            <th>All time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Completed todos</td>
            <td>{completed.dayCount}</td>
            <td>{completed.weekCount}</td>
            <td>{completed.allTimeCount}</td>
          </tr>
          <tr>
            <td>Created todos</td>
            <td>{created.dayCount}</td>
            <td>{created.weekCount}</td>
            <td>{created.allTimeCount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
