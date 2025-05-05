import express from 'express';
import UserController from '../Controller/User.js'; 

const router = express.Router();

router.post('/register', UserController.Register);
router.post('/Login', UserController.Login);
router.get('/logout',UserController.logout)
export default router;
