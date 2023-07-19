import express from 'express';
import { ContactController } from './ContactController';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());

const contactController = new ContactController();

app.post('/identify', contactController.identifyContacts.bind(contactController));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
