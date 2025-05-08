import Board from '../Models/Bord.js';
import List from '../Models/List.js';

const ListController = {
  // Create a new list
  createList: async (req, res) => {
    try {
      const { boardId, name } = req.body;
      const board = await Board.findById(boardId);

      if (!board) {
        return res.status(404).json({ message: 'Board not found' });
      }

      const newList = new List({
        name,
        board: boardId,
      });

      await newList.save();
      board.lists.push(newList._id);
      await board.save();

      res.status(201).json({ message: 'List created successfully', list: newList });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Get all lists for a board
  getListsForBoard: async (req, res) => {
    try {
      const { boardId } = req.params;
      const lists = await List.find({ board: boardId }).populate('tasks');
      res.status(200).json(lists);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  },

  // Delete a list
  deleteList: async (req, res) => {
    try {
      const { listId } = req.params;
      const list = await List.findById(listId);

      if (!list) {
        return res.status(404).json({ message: 'List not found' });
      }

      await list.remove();
      res.status(200).json({ message: 'List deleted successfully' });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: 'Server error' });
    }
  },
};

export default ListController;
