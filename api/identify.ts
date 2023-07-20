// api/identify.ts

import { VercelRequest, VercelResponse } from '@vercel/node';
import { ContactController } from '../src/controllers/ContactController';

const contactController = new ContactController();

export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const response = await contactController.identifyContacts(req.body.email, req.body.phoneNumber);
    res.json(response);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
}
