import express from'express' ;
const  router = express.Router();
import cartController from '../Controller/Cart.js';

router.post('/add', cartController.addToCart);
router.get('/:userId', cartController.getCart);
router.delete('/clear/:userId', cartController.clearCart);

export default router;
