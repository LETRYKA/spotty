import express from 'express';
import { getUsers } from '../resolvers/user-profile/get-user';
import { getUserById } from '../resolvers/user-profile/get-user-by-id';
import { updateUser } from '../resolvers/user-profile/update-user';
import { getUserByName } from '../resolvers/user-profile/get-user-by-name';


export const userRoute = express.Router();

userRoute.get('/:id', getUserById);         
userRoute.patch('/:id', updateUser);        
userRoute.get('/', getUsers);
userRoute.get('/name/:name', getUserByName)               
