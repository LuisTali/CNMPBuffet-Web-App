import {Router} from 'express'
const router = Router();

import {getAllFoods,getFoodById,showEditDailyDish} from '../controllers/Food'

router.get('/',getAllFoods);

router.get('/:id',getFoodById);

export default router;