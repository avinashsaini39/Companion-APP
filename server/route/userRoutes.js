import express from 'express';
import { createUser, getUsers, updateUser, deleteUser } from '../controller/userController.js';


const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;