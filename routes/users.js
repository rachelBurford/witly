import express  from "express";
import { createUserFormController, createUserController } from "../controllers/users.js";

const router = express.Router();

router.get('/create-account', createUserFormController);
router.post('/create-account', createUserController);

export default router;