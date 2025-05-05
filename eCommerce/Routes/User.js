import express from'express' ;
const router = express.Router();
import  authController from '../controller/User.js';

router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
