import {Router} from 'express'
const router = Router();

import {getAllFoods,getFoodById,showEditDailyDish,updateDishesPrice} from '../controllers/Food'

router.get('/',getAllFoods);

router.post('/updatePrices',updateDishesPrice);

router.get('/:id',getFoodById);

export default router;