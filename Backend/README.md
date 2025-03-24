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
