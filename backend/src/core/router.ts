import { Express } from 'express';
import personaRouter from './persona/persona.router';
import userRouter from './usuario/usuario.router';

const API_BASE = '/api/v1';

export default (App: Express) => {
    App.use(`${API_BASE}/personas`, personaRouter);
    App.use(`${API_BASE}/user`, userRouter);
}