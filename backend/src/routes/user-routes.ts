import express from 'express';
import { getUsers } from '../resolvers/user-profile/get-user';
import { getUserById } from '../resolvers/user-profile/get-user-by-id';
import { updateUser } from '../resolvers/user-profile/update-user';




export const userRoute = express.Router();
userRoute.get('/',getUsers);
userRoute.get('/:id',getUserById);
userRoute.post('/:id',updateUser);