import express from 'express';
import { register, login, logout } from '../controllers/usersController.js';


const usersRouter = express.Router();

usersRouter.post("/register", register);

usersRouter.post("/login", login);

usersRouter.post("/logout", logout);


export default usersRouter;