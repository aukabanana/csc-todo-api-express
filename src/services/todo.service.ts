import * as TodoModel from "../models/todo.model";

// Get all todos
const getAllTodos = () => {
  return TodoModel.findAllTodos();
};

// Get todo by ID
const getTodoById = (id: string) => {
  const todo = TodoModel.findTodoById(id);
  if (!todo) {
    throw new Error("Todo not found");
  }
  return todo;
};

// Create a new todo
const createTodo = (description: string) => {
  if (!description || description.trim().length === 0) {
    throw new Error("Description is required");
  }
  return TodoModel.createTodo(description);
};

// Update an existing todo
const updateTodo = (id: string, updates: Partial<TodoModel.TodoItem>) => {
  const updated = TodoModel.updateTodo(id, updates);
  if (!updated) {
    throw new Error("Todo not found");
  }
  return updated;
};

// Delete a todo
const deleteTodo = (id: string) => {
  const success = TodoModel.deleteTodo(id);
  if (!success) {
    throw new Error("Todo not found");
  }
};

// Filter todos
const filterTodos = (isCompleted: boolean) => {
  return TodoModel.filterTodosByCompleted(isCompleted);
};

// Named exports (clean and explicit)
export {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  filterTodos
};