import { Request, Response } from "express";
import * as TodoService from "../services/todo.service";

export const TodoController = {
  // Index - Get all todos
  index: (req: Request, res: Response) => {
    res.json(TodoService.getAllTodos());
  },

  // Show - Get a single todo by ID
  show: (req: Request, res: Response) => {
    try {
      res.json(TodoService.getTodoById(req.params.id as string));
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  },

  // Create - Create a new todo
  create: (req: Request, res: Response) => {
    try {
      res.status(201).json(TodoService.createTodo(req.body.description));
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  // Update - Update an existing todo
  update: (req: Request, res: Response) => {
    try {
      res.json(TodoService.updateTodo(req.params.id as string, req.body));
    } catch (err: any) {
      if (err.message === "Todo not found") {
        return res.status(404).json({ message: err.message });
      }
      res.status(400).json({ message: err.message });
    }
  },

  // Delete - Delete a todo
  delete: (req: Request, res: Response) => {
    try {
      TodoService.deleteTodo(req.params.id as string);
      res.status(204).send();
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  }
};