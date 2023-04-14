import {Router} from 'express'
const router = Router();

import {getAllFoods,getFoodById,insertDishOfDay,updateDishesPriceByCategory,updatePricesById,updateDishOfDay} from '../controllers/Food'

router.get('/',getAllFoods);

router.post('/updatePricesCategory',updateDishesPriceByCategory);

router.post('/newDishOfTheDay',insertDishOfDay);

router.get('/updateDishOfTheDay/:id',updateDishOfDay);

router.post('/updatePricesId/',updatePricesById);

router.get('/:id',getFoodById);

export default router;