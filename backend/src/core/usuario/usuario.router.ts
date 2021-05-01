import express from 'express';
import userController from './usuario.controller' ;

const API_USER = express.Router();

API_USER.get('/selectAll', userController.selectAllUsers);
API_USER.post('/create', userController.createUser);

export default API_USER;
