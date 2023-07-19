import express from 'express';
import { ContactController } from './ContactController';

const app = express();
const port = 3000;

app.use(express.json());

const contactController = new ContactController();

app.post('/identify', contactController.identifyContacts.bind(contactController));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
