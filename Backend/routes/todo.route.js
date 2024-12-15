import express from "express";
import { createTodo, deleteTodo, getAllTodos, updateTodo } from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/create",createTodo);
router.get("/getAllTodos",getAllTodos);
router.put("/update/:id",updateTodo);
router.delete("/delete/:id",deleteTodo); 

export default router;