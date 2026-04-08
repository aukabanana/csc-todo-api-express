import { Router } from "express";
import { TodoController } from "../controllers/todo.controller";

const router = Router();

// Define our strict RESTful CRUD routes
router.get("/", TodoController.index);
router.get("/filter",TodoController.filter);
router.get("/:id", TodoController.show);
router.post("/", TodoController.create);
router.put("/:id", TodoController.update);
router.delete("/:id", TodoController.delete);

export default router;