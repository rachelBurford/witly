import express from 'express';
import multer from 'multer';

import {
    createPersonFormController,
    createPersonController,
    fetchPeopleController,
    fetchPersonController,
    updatePersonController
} from '../controllers/people.js'

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
          cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
          cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.get('/', fetchPeopleController)
router.get('/profile', createPersonFormController)
router.post('/profile', upload.single('photo'), createPersonController)
router.get('/profile/:id', fetchPersonController)
router.post('/profile/:id', updatePersonController)

export default router;