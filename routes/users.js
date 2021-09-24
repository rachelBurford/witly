import express  from 'express';
import passport from 'passport';
import { createUserFormController } from "../controllers/users.js";
import { createUserController } from "../controllers/users.js";
import { loginFormController } from "../controllers/users.js";

const router = express.Router();

router.get('/create-account', createUserFormController);
router.post('/create-account', createUserController);
router.get('/login', loginFormController);
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',}),
        loginFormController
);
router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
});

export default router;