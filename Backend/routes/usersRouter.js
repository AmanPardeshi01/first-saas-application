import express from 'express';
import { register, login, logout, userProfile } from '../controllers/usersController.js';


const usersRouter = express.Router();

usersRouter.post("/register", register);

usersRouter.post("/login", login);

usersRouter.post("/logout", logout);

usersRouter.get("/userProfile", userProfile);



export default usersRouter;