import {Router} from 'express';
const router = Router();

import {login,registerUser,showLogin,logOut} from '../controllers/Auth'

router.get('/showLogin',showLogin);
router.get('/logout',logOut);
router.post('/login',login);
//router.post('/register',registerUser);

export default router;