import express from 'express';
const router=express.Router();
import UserControll from '../Controller/User.js'
router.post('/Register',UserControll.Register);
router.post('/Login',UserControll.Login);
router.get('/Logout',UserControll.Logout);

export default router;