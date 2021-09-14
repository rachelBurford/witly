import express  from "express";
import { createUserFormController } from "../controllers/users.js";

const router = express.Router();

router.get('/create-account', createUserFormController)

export default router;