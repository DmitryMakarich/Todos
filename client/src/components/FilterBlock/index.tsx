import React from "react";
import { FilterOptions } from "../../utils/FilterOptions";

import "./index.scss";

interface Props {
  filterHandler: (filter: FilterOptions) => void;
  filterOption: FilterOptions;
}

export default function FilterBlock({ filterOption, filterHandler }: Props) {
  return (
    <div className="filter-block">
      <button
        disabled={filterOption === FilterOptions.All}
        onClick={() => filterHandler(FilterOptions.All)}
      >
        All
      </button>
      <button
        disabled={filterOption === FilterOptions.Completed}
        onClick={() => filterHandler(FilterOptions.Completed)}
      >
        Completed
      </button>
      <button
        disabled={filterOption === FilterOptions.UnCompleted}
        onClick={() => filterHandler(FilterOptions.UnCompleted)}
      >
        Uncompleted
      </button>
    </div>
  );
}
