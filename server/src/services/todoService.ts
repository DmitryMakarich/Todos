import Todo from "../models/Todo";
import User from "../models/User";


class TodoService {
  async getTodos(userId: string) {
    const todos = await Todo.find({ user: userId });

    return todos;
  }

  async create(data: any, userId: string) {
    const user = await User.findOne({ _id: userId });

    const todo = new Todo({
      title: data.title,
      tag: data.tagId,
      user: userId,
    });

    await todo.save();

    user.todos.push(todo._id);

    await user.save();

    return todo;
  }

  async update(id: string, data: any) {
    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      title: data.title,
      isCompleted: data.isCompleted,
      tag: data.tagId,
    });

    return updatedTodo;
  }

  async delete(id: string) {
    const deleted = await Todo.findByIdAndDelete(id);

    return deleted;
  }
}

export default new TodoService();
