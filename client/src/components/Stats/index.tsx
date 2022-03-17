import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getStatsAction, setPeriod } from "../../redux/todo/todo.actions";
import { getStats, getLoadingStatus } from "../../redux/todo/todo.selectors";
import { TimeOptions } from "../../utils/TimeOptions";

import "./index.scss";

interface Props {
  selectedTags: Array<string>;
}

export default function Stats({ selectedTags }: Props) {
  const { completed, created, period } = useSelector(getStats);
  const { isLoading } = useSelector(getLoadingStatus);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStatsAction(period, selectedTags));
  }, [period, isLoading, selectedTags]);

  return (
    <div className="stats-table">
      <table>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Completed todos</td>
            <td>{completed}</td>
          </tr>
          <tr>
            <td>Created todos</td>
            <td>{created}</td>
          </tr>
        </tbody>
      </table>
      <div className="stats-table_btn-block">
        <button
          disabled={period === TimeOptions.Day}
          onClick={() => dispatch(setPeriod(TimeOptions.Day))}
        >
          day
        </button>
        <button
          disabled={period === TimeOptions.Week}
          onClick={() => dispatch(setPeriod(TimeOptions.Week))}
        >
          week
        </button>
        <button
          disabled={period === TimeOptions.AllTime}
          onClick={() => dispatch(setPeriod(TimeOptions.AllTime))}
        >
          all time
        </button>
      </div>
    </div>
  );
}
