import { Request, Response } from 'express';
import { ContactService } from '../services/ContactService';

export class ContactController {
  private contactService: ContactService;

  constructor() {
    this.contactService = new ContactService();
  }

  public identifyContacts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, phoneNumber } = req.body;

      if (!email && !phoneNumber) {
        res.status(400).json({ error: 'At least one of email or phoneNumber must be provided' });
      }

      const response = await this.contactService.identifyContacts(email, phoneNumber);
      res.json(response);
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
}
