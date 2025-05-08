import Task from '../Models/Task.js';
import List from '../Models/List.js';
import Board from '../Models/Bord.js';

const TaskController = {
  // Create a new task
  createTask: async (req, res) => {
    try {
      const { listId, title, description, assignedTo } = req.body;
      const list = await List.findById(listId);

      if (!list) {
        return res.status(404).json({ message: 'List not found' });
      }

      const newTask = new Task({
        title,
        description,
        list: listId,
        board: list.board,
        assignedTo,
      });

      await newTask.save();
      list.tasks.push(newTask._id);
      await list.save();

      res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Get all tasks for a list
  getTasksForList: async (req, res) => {
    try {
      const { listId } = req.params;
      const tasks = await Task.find({ list: listId }).populate('assignedTo');
      res.status(200).json(tasks);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Update task (e.g., status change or assignee change)
  updateTask: async (req, res) => {
    try {
      const { taskId } = req.params;
      const { title, description, assignedTo, status } = req.body;
      
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      task.title = title || task.title;
      task.description = description || task.description;
      task.assignedTo = assignedTo || task.assignedTo;
      task.status = status || task.status;

      // Add activity log
      task.activityLogs.push({
        user: req.user.id,
        action: 'updated',
        timestamp: Date.now(),
      });

      await task.save();
      res.status(200).json({ message: 'Task updated successfully', task });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Delete task
  deleteTask: async (req, res) => {
    try {
      const { taskId } = req.params;
      const task = await Task.findById(taskId);

      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      // Remove task from list
      const list = await List.findById(task.list);
      list.tasks.pull(taskId);
      await list.save();

      await task.remove();
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Move task to another list
  moveTask: async (req, res) => {
    try {
      const { taskId } = req.params;
      const { targetListId } = req.body;

      const task = await Task.findById(taskId);
      const targetList = await List.findById(targetListId);

      if (!task || !targetList) {
        return res.status(404).json({ message: 'Task or List not found' });
      }

      // Update task's list
      task.list = targetListId;

      // Add activity log for moving task
      task.activityLogs.push({
        user: req.user.id,
        action: `moved to list ${targetList.name}`,
        timestamp: Date.now(),
      });

      await task.save();
      res.status(200).json({ message: 'Task moved successfully', task });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

export default TaskController;
