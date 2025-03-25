# SPURTI - A Decentralized Application

## API Endpoints

### POST /user/register

Registers a new user.

**Request Body:**

- `name` (string): The name of the user.
- `email` (string): The email of the user.
- `password` (string): The password of the user.
- `mobileNo` (string): The mobile number of the user.
- `role` (string): The role of the user.
- `address` (string): The address of the user.

**Responses:**

- `200 OK`: User Created Successfully
- `400 Bad Request`: Error While Saving the user : {error message}

**Postman Example:**

```json
{
  "name": "Ayush Pawar",
  "email": "ayush@gmail.com",
  "password": "Password@123",
  "mobileNo": "1234567890",
  "role": "user",
  "address": "123 Main St"
}
```

### POST /user/login

Logs in a user.

**Request Body:**

- `email` (string): The email of the user.
- `password` (string): The password of the user.

**Responses:**

- `200 OK`: User Logged In Successfully!
- `400 Bad Request`: Error while saving the user : {error message}

**Postman Example:**

```json
{
  "email": "ayush@gmail.com",
  "password": "Password@123"
}
```

### POST /user/logout

Logs out a user.

**Responses:**

- `200 OK`: User Logged Out Successfully!

**Postman Example:**

No request body required.
