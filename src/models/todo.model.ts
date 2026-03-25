import { v4 as uuidv4 } from "uuid";

export interface TodoItem {
  id: string;
  description: string;
  completed?: boolean;
}

let todos: TodoItem[] = [
  { id: uuidv4(), description: "Prepare lecture notes", completed: false },
  { id: uuidv4(), description: "Grade assignments", completed: true }
];

// Get all todos
const findAllTodos = (): TodoItem[] => {
  return todos;
};

// Get todo by ID
const findTodoById = (id: string): TodoItem | undefined => {
  return todos.find(t => t.id === id);
};

// Create new todo
const createTodo = (description: string): TodoItem => {
  const newTodo: TodoItem = {
    id: uuidv4(),
    description,
    completed: false
  };
  todos = [...todos, newTodo]; // Prefer immutable updates!
  return newTodo;
};

// Update todo
const updateTodo = (id: string, updates: Partial<TodoItem>): TodoItem | undefined => {
  const todoIndex = todos.findIndex(t => t.id === id);
  if (todoIndex === -1) return undefined;
  const updatedTodo = { ...todos[todoIndex], ...updates };
  todos = todos.map(t => t.id === id ? updatedTodo : t);
  return updatedTodo;
};

// Delete todo
const deleteTodo = (id: string): boolean => {
  const initialLength = todos.length;
  todos = todos.filter(t => t.id !== id);
  return todos.length < initialLength;
};

// Filter todos
const filterTodosByCompleted = (completed: boolean): TodoItem[] => {
  return todos.filter(t => t.completed === completed);
};

// Export all the model functions at the bottom
export {
  findAllTodos,
  findTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  filterTodosByCompleted
};