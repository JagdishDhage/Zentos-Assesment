import Board from '../Models/Bord.js';
import User from '../Models/User.js'; 
import List from '../Models/List.js';

const BoardController = {
  // Create a new board
  createBoard: async (req, res) => {
    try {
      const { name, members } = req.body;
      const userId = req.user.id; // Assuming the user is authenticated

      // Create a new board
      const newBoard = new Board({
        name,
        owner: userId,
        members: [userId, ...members], // Adding the creator as a member by default
      });

      // Save the new board
      await newBoard.save();

      // Add the board to the user's 'boards' field
      const user = await User.findById(userId);
      user.boards.push(newBoard._id);  // Add the board's ID to the user's boards array
      await user.save();

      res.status(201).json({ message: 'Board created successfully', board: newBoard });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Get all boards for the logged-in user
  getBoards: async (req, res) => {
    try {
      const userId = req.user.id;

      // Fetch the user and populate the boards array
      const user = await User.findById(userId).populate('boards');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Return the populated user with all boards
      res.status(200).json(user.boards); // Send the boards array populated with board data
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Add members to a board
  addMembersToBoard: async (req, res) => {
    try {
      const { boardId, members } = req.body;
      const board = await Board.findById(boardId);

      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }

      // Ensure the user is the board owner
      if (board.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Unauthorized action' });
      }

      board.members.push(...members);
      await board.save();
      res.status(200).json({ message: 'Members added successfully', board });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

export default BoardController;
