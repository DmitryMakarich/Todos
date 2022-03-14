import React from "react";

import "./index.scss";

interface Props {
  filterHandler: Function;
  filterOption: boolean | null;
}

export default function FilterBlock({ filterOption, filterHandler }: Props) {
  return (
    <div className="filter-block">
      <button
        disabled={filterOption === null}
        onClick={() => filterHandler(null)}
      >
        All
      </button>
      <button
        disabled={filterOption === true}
        onClick={() => filterHandler(true)}
      >
        Completed
      </button>
      <button
        disabled={filterOption === false}
        onClick={() => filterHandler(false)}
      >
        Uncompleted
      </button>
    </div>
  );
}
