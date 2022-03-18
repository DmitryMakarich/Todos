import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "@mui/material";

import "./index.scss";
import TodoList from "../../components/TodoList";
import Loader from "../../components/Loader";
import CreationForm from "../../components/Modal/Forms/Creation";

import FilterBlock from "../../components/FilterBlock";
import TodoModel from "../../model/Todo";
import { getTagAction, setSelectedTags } from "../../redux/tag/tag.actions";
import {
  getStatsAction,
  getTodosAction,
  removeTodoAction,
  SetCurrentPage,
  setFilter,
  setModal,
  updateTodoAction,
} from "../../redux/todo/todo.actions";
import { getTodosData } from "../../redux/todo/todo.selectors";
import { getSelectedTags, getTags } from "../../redux/tag/tag.selectors";
import { LIMIT_COUNT } from "../../constants/todo.constants";
import { FilterOptions } from "../../utils/FilterOptions";
import Stats from "../../components/Stats";
import CustomSelect from "../../components/CustomSelect";

function TodoPage() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { todos, currentPage, isLoading, totalPages, filter } =
    useSelector(getTodosData);

  const { tags } = useSelector(getTags);
  const { selectedTags } = useSelector(getSelectedTags);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTagAction());

    dispatch(getStatsAction([]));
  }, []);

  useEffect(() => {
    dispatch(setSelectedTags([]));
  }, [isLoading]);

  useEffect(() => {
    dispatch(getTodosAction(currentPage, LIMIT_COUNT, filter));
  }, [currentPage, filter]);

  const openModalHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  const updateTodoHandler = (updateTodo: TodoModel) => {
    dispatch(updateTodoAction(updateTodo));
  };

  const deleteTodoHandler = (id: string) => {
    dispatch(removeTodoAction(id));
  };

  const setFilterHandler = (filter: FilterOptions) => {
    dispatch(setFilter(filter));
  };

  const selectTagsHandler = (tags: Array<string>) => {
    dispatch(setSelectedTags(tags));
  };

  return (
    <>
      <section className="todo-page">
        <Stats selectedTags={selectedTags} />
        <h1>Your todo list</h1>
        <button
          className="todo-page_create-btn"
          onClick={() => {
            dispatch(setModal(true));
            openModalHandler();
          }}
          style={
            !todos.length
              ? {
                  border: "5px solid white",
                  animationDuration: "3s",
                  animationName: "highlights",
                  animationIterationCount: "infinite",
                }
              : {}
          }
        >
          Create todo
        </button>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="todo-page_filters">
              <CustomSelect
                tags={tags.map((tag) => ({
                  label: tag.title,
                  value: tag._id,
                }))}
                selectTagsHandler={selectTagsHandler}
              />
              <FilterBlock
                filterHandler={setFilterHandler}
                filterOption={filter}
              />
            </div>

            <TodoList
              isEmpty={todos.length === 0}
              todos={todos}
              tags={tags}
              deleteHandler={deleteTodoHandler}
              updateHadler={updateTodoHandler}
            />
            <Pagination
              page={currentPage}
              onChange={(_, value) => dispatch(SetCurrentPage(value))}
              className="todo-page_links"
              count={totalPages}
              color="primary"
              hidePrevButton
              hideNextButton
              style={{ color: "white" }}
            />
          </>
        )}
      </section>
      {isOpenModal && (
        <CreationForm
          onCloseHandler={openModalHandler}
          options={tags}
          isLoading={isLoading}
        />
      )}
    </>
  );
}

export default TodoPage;
