import express from 'express';
import { ContactController } from './src/controllers/ContactController';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

const contactController = new ContactController();

app.post('/api/identify', contactController.identifyContacts.bind(contactController));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
export default app;