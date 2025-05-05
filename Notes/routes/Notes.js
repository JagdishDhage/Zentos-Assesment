import express from 'express';
import NotesController from '../Controller/NotesController.js';
import Auth from '../Middlewares/User.js'
const router = express.Router();    

router.post('/',Auth,NotesController.createNotes);
router.get('/',NotesController.getAllNotes);

export default router;