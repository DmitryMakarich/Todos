import React from "react";
import UserStatsModel from "../../model/UserStats";
import { userTitles } from "../../utils/TableTitles";

import "./index.scss";

interface Props {
  stats: UserStatsModel[];
}

export default function UserList({ stats }: Props) {
  return (
    <div className="user-list">
      <table>
        <thead className="user-list_head">
          <tr>
            {userTitles.map((title) => (
              <th key={title.label}>{title.label}</th>
            ))}
          </tr>
        </thead>
        <tbody className="user-list_body">
          {stats.map((elem) => (
            <tr key={elem._id}>
              <td>{elem.fullName}</td>
              <td>
                {elem.createdTodos.dayCount} / {elem.completedTodos.dayCount}
              </td>
              <td>
                {elem.createdTodos.weekCount} / {elem.completedTodos.weekCount}
              </td>
              <td>
                {elem.createdTodos.allTimeCount} /{" "}
                {elem.completedTodos.allTimeCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
