import express from 'express';
import {createTask, getAllTasks, updateTask, deleteTask} from '../controllers/tasksController.js';
const router = express.Router(); //Route để xử lý các yêu cầu liên quan đến tasks

//Route để định nghĩa API endpoint cho các tasks

router.get("/", getAllTasks)

router.post("/", createTask)

router.put("/:id", updateTask)

router.delete("/:id", deleteTask)

export default router;