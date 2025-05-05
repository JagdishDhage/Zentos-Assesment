import Notes from '../Models/Notes.js';

const NotesController = {
   
    getAllNotes: async (req, res) => {
        try {
            const userId = req.user.userId; 
            const notes = await Notes.find({ user: userId });
            res.status(200).json(notes);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching notes', error: err.message });
        }
    },


    createNotes: async (req, res) => {
        try {
            const { title, content, tags } = req.body;
            
            if (!title) {
                return res.status(400).json({ message: 'Title is required' });
            }

            const newNote = new Notes({
                user: req.user.userId,  
                title,
                content,
                tags,
            });
            console.log(req.user);
            console.log("req.user");
            const savedNote = await newNote.save();
            res.status(201).json(savedNote);
        } catch (err) {
            res.status(500).json({ message: 'Error creating note', error: err.message });
        }
    }
};

export default NotesController;
