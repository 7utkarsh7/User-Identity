import { FieldPacket, OkPacket } from 'mysql2';
import { Contact } from './ContactInterface';
import { executeQuery } from './DatabaseUtils';

export class ContactRepository {
  public async findPrimaryContactByEmail(email: string): Promise<Contact | null> {
    const query = 'SELECT CASE WHEN linkedId IS NULL THEN id ELSE linkedId END AS linkedId FROM Contact WHERE email = ? LIMIT 1';
    const values = [email];
    const results = await executeQuery<Contact[]>(query, values);
    return results.length > 0 ? results[0] : null;
  }

  public async findPrimaryContactByPhoneNumber(phoneNumber: string): Promise<Contact | null> {
    const query = 'SELECT CASE WHEN linkedId IS NULL THEN id ELSE linkedId END AS linkedId FROM Contact WHERE phoneNumber = ? LIMIT 1';
    const values = [phoneNumber];
    const results = await executeQuery<Contact[]>(query, values);
    return results.length > 0 ? results[0] : null;
  }

  public async findPrimaryUserIdByEmailAndPhoneNumber(email: string, phoneNumber: string): Promise<number | null> {
    const query = 'SELECT id FROM Contact WHERE email = ? AND phoneNumber = ?';
    const values = [email, phoneNumber];
    const results = await executeQuery<Contact[]>(query, values);
    return results.length > 0 ? results[0].id : null;
  }

  public async updateLinkedId(emailMatchedId: number, numberMatchedId: number): Promise<void> {
    const query = 'UPDATE Contact SET linkedId = ? WHERE id = ? OR linkedId = ?';
    const values = [emailMatchedId, numberMatchedId, numberMatchedId];
    await executeQuery<void>(query, values);
  }

  public async updateLinkPrecedence(primaryContactId: number): Promise<void> {
    const query = 'UPDATE Contact SET linkPrecedence = "secondary" WHERE id = ?';
    const values = [primaryContactId];
    await executeQuery<void>(query, values);
  }

  public async createPrimaryContact(phoneNumber: string, email: string): Promise<number> {
    const query = 'INSERT INTO Contact (phoneNumber, email, linkPrecedence, createdAt, updatedAt) VALUES (?, ?, "primary", NOW(), NOW())';
    const values = [phoneNumber, email];
    const results = await executeQuery<OkPacket>(query, values);
    return results.insertId!;
  }

  public async createSecondaryContact(phoneNumber: string, email: string, linkedId: number | null): Promise<number> {
    const query = 'INSERT INTO Contact (phoneNumber, email, linkedId, linkPrecedence, createdAt, updatedAt) VALUES (?, ?, ?, "secondary", NOW(), NOW())';
    const values = [phoneNumber, email, linkedId];
    const results = await executeQuery<OkPacket>(query, values);
    return results.insertId!;
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
