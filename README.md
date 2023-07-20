# User Identity API

The User Identity API allows users to identify contacts using their email and phone number. This API serves as a backend service to consolidate contact information based on the provided email and phone number.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoint](#api-endpoint)
- [Example Request](#example-request)
- [Contact](#contact)

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/user-identity-api.git
Install the dependencies using npm:

```bash
cd user-identity-api
npm install
```
Usage
To run the API server, use the following command:

```bash
npm start
```
The server will be running on http://localhost:8080.

API Endpoint
Identify Contacts
Endpoint: /api/identify

HTTP Method: POST

Request Body:

```json
{
  "email": "john@example.com",
  "phoneNumber": "1234567890"
}
```
Response:

```json
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["john@example.com", "jane@example.com"],
    "phoneNumbers": ["1234567890", "9876543210"],
    "secondaryContactIds": [2, 3, 4]
  }
}
```
Example Request
```curl
curl --location 'https://user-identity-gbgf4pcit-7utkarsh7.vercel.app/api/identify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "dummy@123.in",
    "phoneNumber": "9889787889"
}'
```

Contact
If you have any questions or suggestions, please feel free to reach out to us at utkarshdohare2@gmail.com.

