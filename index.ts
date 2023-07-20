import express, { Request, Response } from 'express';
import { ContactController } from './src/controllers/ContactController';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const contactController = new ContactController();

app.post('/api/identify', contactController.identifyContacts.bind(contactController));

export default app;
