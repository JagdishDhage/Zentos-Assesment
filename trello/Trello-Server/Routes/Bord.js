import express from 'express';
import BoardController from '../Controller/Bord.js';
import Auth from '../Middlewares/Auth.js'; 
import Board from '../Models/Bord.js';
const router = express.Router();

// Create a new board (authenticated users)
router.post('/create', Auth, BoardController.createBoard);

// Get all boards for the logged-in user
router.get('/', Auth, BoardController.getBoards);

// Add members to a board (only the owner can add members)
router.post('/add-members', Auth, BoardController.addMembersToBoard);
router.get('/:id', Auth, async (req, res) => {
    try {
      const board = await Board.findById(req.params.id).populate('lists');
      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }
      res.json(board);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
export default router;
