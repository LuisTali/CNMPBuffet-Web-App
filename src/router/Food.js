import {Router} from 'express'
const router = Router();

import {getAllFoods,getFoodById,showEditDailyDish} from '../controllers/Food'

router.get('/',getAllFoods);

router.get('/:id',getFoodById);

router.get('/:id/editDailyDish',showEditDailyDish);

export default router;