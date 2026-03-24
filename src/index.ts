import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 3000;

interface TodoItem {
    id: string;
    title: string;
    completed: boolean;
    createdAt: string;
}

let todos: Array<TodoItem> = [
    {
        id: uuidv4(),
        title: 'Learn Node.js',
        completed: false,
        createdAt: new Date().toISOString(),
    },
    {
        id: uuidv4(),
        title: 'Build a REST API',
        completed: true,
        createdAt: new Date().toISOString(),
    },
    {
        id: uuidv4(),
        title: 'Master TypeScript',
        completed: false,
        createdAt: new Date().toISOString(),
    },
];

app.get('/todos', (req: Request, res: Response) => {
    res.status(200).json(todos);
});

app.get('/todos/filter', (req: Request, res: Response) => {
    const statusParam = req.query.completed as string;

    if (statusParam === undefined) {
        res.status(400).json({
            code: 400,
            message: `Pleas provide a completed query parameter (e.g., /todos/filter?completed=true)`,
        });
        return;
    }

    const isCompleted = statusParam.toLowerCase() === 'true';
    const filteredTodos = todos.filter((t) => t.completed === isCompleted);

    res.status(200).json(filteredTodos);
})

app.get('/todos/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id == id);

    if (!todo) {
        res.status(404).json({ error: `Todo with id ${id} not Found` });
        return;
    }

    res.status(200).json(todo);
});

app.post('/todos', (req: Request, res: Response) => {
    const { title } = req.body as Partial<TodoItem>;

    if (!title || typeof title != 'string' || title.trim().length === 0) {
        res.status(400).json({message: `Title is require and must be a non-empty string`});
        return;
    }

    const newTodo: TodoItem = {
        id: uuidv4(),
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
    };

    todos.push(newTodo);

    res.status(200).json(newTodo);
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})