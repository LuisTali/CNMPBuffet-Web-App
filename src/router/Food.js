import {Router} from 'express'
const router = Router();

import {getAllFoods,getFoodById,insertDishOfDay,updateDishesPrice,updateDishOfDay} from '../controllers/Food'

router.get('/',getAllFoods);

router.post('/updatePrices',updateDishesPrice);

router.post('/newDishOfTheDay',insertDishOfDay)

router.get('/updateDishOfTheDay/:id',updateDishOfDay)

router.get('/:id',getFoodById);

export default router;