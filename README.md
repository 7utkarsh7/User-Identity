User Identity API
This is a simple Node.js API project that provides an endpoint for identifying user contacts based on their email and phone number. It is designed to be deployed as a serverless function on the Vercel platform.

API Endpoint
The API endpoint for identifying user contacts is as follows:

bash
Copy code
POST /api/identify
Request Body
The request must include a JSON object with either an email or a phoneNumber (or both) to identify the user's contacts. The request body should be in the following format:

json
Copy code
{
  "email": "user@example.com",
  "phoneNumber": "1234567890"
}
Response
The API will respond with a JSON object containing the identification results. The response will include the primary contact ID, a list of unique emails, a list of unique phone numbers, and an array of secondary contact IDs.

json
Copy code
{
  "contact": {
    "primaryContactId": 1,
    "emails": ["user@example.com"],
    "phoneNumbers": ["1234567890"],
    "secondaryContactIds": [2, 3, 4]
  }
}
Usage
You can use this API by sending a POST request to the /api/identify endpoint with the required data using tools like curl or Postman.

Here's an example curl command to identify contacts:

bash
Copy code
curl --location 'https://your-vercel-app-url/api/identify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "user@example.com",
    "phoneNumber": "1234567890"
}'
Setup and Deployment
To run this API locally, follow these steps:

Clone this repository.
Install the required dependencies using npm install.
Create a .env file in the root directory and configure your environment variables, such as database credentials and other configuration settings.
Run the development server using npm run dev.
To deploy this API to Vercel, you can use the Vercel CLI or connect your GitHub repository to Vercel to enable automatic deployments.

Configuration
This project uses environment variables for configuration. Ensure you set the following environment variables in your .env file:

makefile
Copy code
PGHOST=your_database_host
PGPORT=your_database_port
PGUSER=your_database_user
PGPASSWORD=your_database_password
PGDATABASE=your_database_name
PORT=your_desired_port
Technologies Used
Node.js
Express.js
TypeScript
MySQL2 (Database)
Vercel (for deployment)
Contributing
Contributions to this project are welcome! If you find any issues or have suggestions for improvements, feel free to open a pull request or an issue.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Author
This project was created by Your Name.