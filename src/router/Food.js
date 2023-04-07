import {Router} from 'express'
const router = Router();

import {getAllFoods,getFoodById} from '../controllers/Food'

router.get('/',getAllFoods);

router.get('/:id',getFoodById);

export default router;