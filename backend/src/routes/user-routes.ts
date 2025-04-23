import express from 'express';
import { getUsers } from '../resolvers/user-profile/get-user';


export const userRoute = express.Router();
userRoute.get('/me',getUsers);

