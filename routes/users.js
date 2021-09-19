import express  from "express";
import { createUserFormController } from "../controllers/users.js";
import { createUserController } from "../controllers/users.js";

const router = express.Router();

router.get('/create-account', createUserFormController);
router.post('/create-account', createUserController);

export default router;