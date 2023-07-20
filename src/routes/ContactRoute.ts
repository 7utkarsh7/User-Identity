import { Router } from 'express';
import { ContactController } from './src/controllers/ContactController';

const router = Router();
const contactController = new ContactController();

router.post('/identify', contactController.identifyContacts);

export default router;
