import { Contact } from '../models/ContactInterface';
import { ContactRepository } from '../repository/ContactRepository';

export class ContactService {
  private contactRepository: ContactRepository;

  constructor() {
    this.contactRepository = new ContactRepository();
  }

  public async identifyContacts(email: string | null, phoneNumber: string | null): Promise<any> {
    if (!email && !phoneNumber) {
      throw new Error('At least one of email or phoneNumber must be provided');
    }

    const isEmailMatched = await this.contactRepository.findPrimaryContactByEmail(email);
    const isNumberMatched = await this.contactRepository.findPrimaryContactByPhoneNumber(phoneNumber);

    if (!isEmailMatched && !isNumberMatched) {
      const insertId = await this.contactRepository.createPrimaryContact(phoneNumber!, email!);
      const response = await this.sendResponse(insertId);
      return response;
    } else if (isEmailMatched && isNumberMatched) {
      if (isEmailMatched.id === isNumberMatched.id) {
        const primaryUserId = await this.contactRepository.findPrimaryUserIdByEmailAndPhoneNumber(
          email!,
          phoneNumber!
        );
        const response = await this.sendResponse(primaryUserId);
        return response;
      } else {
        await this.contactRepository.updateLinkedId(isEmailMatched.id!, isNumberMatched.id!);
        await this.contactRepository.updateLinkPrecedence(isNumberMatched.id!);
        const response = await this.sendResponse(isEmailMatched.id!);
        return response;
      }
    } else {
      const linkedId = isEmailMatched?.id || isNumberMatched?.id;
      if (phoneNumber && email) {
        await this.contactRepository.createSecondaryContact(phoneNumber, email, linkedId!);
      }
      const response = await this.sendResponse(linkedId!);
      return response;
    }
  }

  private async sendResponse(primaryContactId: number | null): Promise<any> {
    const primaryContact = await this.contactRepository.findContactById(primaryContactId!);
    const secondaryContacts = await this.contactRepository.findContactsByLinkedId(primaryContactId!);

    const uniqueEmails = new Set<string>();
    const uniquePhoneNumbers = new Set<string>();

    if (primaryContact) {
      uniqueEmails.add(primaryContact.email!);
      uniquePhoneNumbers.add(primaryContact.phoneNumber!);
    }

    secondaryContacts.forEach((contact:Contact) => {
      uniqueEmails.add(contact.email!);
      uniquePhoneNumbers.add(contact.phoneNumber!);
    });

    return {
      contact: {
        primaryContactId: primaryContact ? primaryContact.id : null,
        emails: Array.from(uniqueEmails).filter((element) => element !== null),
        phoneNumbers: Array.from(uniquePhoneNumbers).filter((element) => element !== null),
        secondaryContactIds: secondaryContacts.map((contact:Contact) => contact.id),
      },
    };
  }
}
