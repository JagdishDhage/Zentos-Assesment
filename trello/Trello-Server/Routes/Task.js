import express from 'express';
import TaskController from '../Controller/Task.js';
import Auth from '../Middlewares/Auth.js';

const router = express.Router();

// Create a new task under a specific list
router.post('/create', Auth, TaskController.createTask);

// Get all tasks for a specific list
router.get('/:listId', Auth, TaskController.getTasksForList);

// Update a task (change title, description, assignee, etc.)
router.put('/:taskId', Auth, TaskController.updateTask);

// Delete a task
router.delete('/:taskId', Auth, TaskController.deleteTask);

// Move a task to another list
router.put('/:taskId/move', Auth, TaskController.moveTask);

export default router;
