import express from "express";
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser
} from "../controllers/UserController.js";

const router = express.Router();

router.get('/tasks', getUsers);
router.get('/tasks/:id', getUserById);
router.post('/tasks', createUser);
router.patch('/tasks/:id', updateUser);
router.delete('/tasks/:id', deleteUser);

export default router;