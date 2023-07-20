import { Contact } from '../models/ContactInterface';
import { executeQuery } from '../utils/DatabaseUtils';

export class ContactRepository {
  public async findPrimaryContactByEmail(email: string | null): Promise<Contact | null> {
    const query = `SELECT * FROM Contact WHERE email = ? LIMIT 1`;
    const values = [email];
    const results = await executeQuery<Contact[]>(query, values);
    return results.length > 0 ? results[0] : null;
  }

  public async findPrimaryContactByPhoneNumber(phoneNumber: string | null): Promise<Contact | null> {
    const query = `SELECT * FROM Contact WHERE phoneNumber = ? LIMIT 1`;
    const values = [phoneNumber];
    const results = await executeQuery<Contact[]>(query, values);
    return results.length > 0 ? results[0] : null;
  }

  public async createPrimaryContact(phoneNumber: string, email: string): Promise<number> {
    const query = `INSERT INTO Contact (phoneNumber, email, linkPrecedence, createdAt, updatedAt) 
      VALUES (?, ?, "primary", NOW(), NOW())`;
    const values = [phoneNumber, email];
    const result = await executeQuery<{ insertId: number }>(query, values);
    return result.insertId;
  }

  public async findPrimaryUserIdByEmailAndPhoneNumber(
    email: string,
    phoneNumber: string
  ): Promise<number | null> {
    const query = `SELECT id FROM Contact WHERE email = ? AND phoneNumber = ?`;
    const values = [email, phoneNumber];
    const results = await executeQuery<{ id: number }[]>(query, values);
    return results.length > 0 ? results[0].id : null;
  }

  public async updateLinkedId(isEmailMatched: number, isNumberMatched: number): Promise<void> {
    const query = 'UPDATE Contact SET linkedId = ? WHERE id = ? OR linkedId=?';
    const values = [isEmailMatched, isNumberMatched, isNumberMatched];
    await executeQuery<void>(query, values);
  }

  public async updateLinkPrecedence(primaryContact2: number | null): Promise<void> {
    const query = 'UPDATE Contact SET linkPrecedence = "secondary" WHERE id = ?';
    const values = [primaryContact2];
    await executeQuery<void>(query, values);
  }

  public async createSecondaryContact(
    phoneNumber: string,
    email: string,
    linkedId: number | null
  ): Promise<number> {
    const query = `INSERT INTO Contact (phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt) 
      VALUES (?, ?, ?, "secondary", NOW(), NOW())`;
    const values = [phoneNumber, email, linkedId];
    const result = await executeQuery<{ insertId: number }>(query, values);
    return result.insertId;
  }

  public async findContactById(id: number): Promise<Contact | null> {
    const query = 'SELECT * FROM Contact WHERE id = ? LIMIT 1';
    const values = [id];
    const results = await executeQuery<Contact[]>(query, values);
    return results.length > 0 ? results[0] : null;
  }
  public async findContactsByLinkedId(linkedId: number): Promise<Contact[]> {
    const query = 'SELECT * FROM Contact WHERE linkedId = ?';
    const values = [linkedId];
    return await executeQuery<Contact[]>(query, values);
  }
}
