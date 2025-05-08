import express from 'express';
import ListController from '../Controller/List.js';
import Auth from '../Middlewares/Auth.js';

const router = express.Router();

// Create a new list under a specific board
router.post('/create', Auth, ListController.createList);

// Get all lists for a specific board
router.get('/:boardId', Auth, ListController.getListsForBoard);

// Delete a list (only the board owner should be allowed to delete lists)
router.delete('/:listId', Auth, ListController.deleteList);

export default router;
