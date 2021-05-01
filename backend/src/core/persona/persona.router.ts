import express from 'express';
import personaController from './persona.controller' ;

const API_PERSONA = express.Router();

API_PERSONA.get('/selectAll', personaController.selectAllPersons);

export default API_PERSONA;
