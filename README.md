# API server for the e-commerce admin cms

Here is the repo for the frontend app..

## APIs

All the api end points are prefixed with `{rootUrl}/api/v1`

### Admin Users API

This api end points is used to manage admin users and their permissions.
All the API end points are prefixed with `{rootUrl}/api/v1/admin/users`

Restful API end points: can call one endpoint at a time using the different HTTP verbs like GET, POST, PUT, DELETE.

| #   | PATH              | METHOD | PRIVATE | DESCRIPTION                                                                                                                                                                    |
| --- | ----------------- | ------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | /                 | GET    | No      | Get all the admin users                                                                                                                                                        |
| 2.  | `/`               | POST   | No      | Receives new admin data and create a new admin user in the database. If admins user's email already exists, it will return an error otherwise it will create a new admin user. |
| 3.  | `/verify-email`   | PATCH  | No      | Receives `email, verificationCode` to verify the admin user, returns success or error accordingly.                                                                             |
| 4.  | `/login`          | POST   | No      | Receives `{email, password}` and checks uf the user exist for that combination of email and password in the database.                                                          |
| 5.  | `/reset-password` | PATCH  | No      | Receives `email, resetCode, newPassword` to reset the admin user's password.                                                                                                   |

- Receives the id of the admin user and delete the admin user from the database.

### Hashings API

- Hashing API is used to hash the password and verify the password.
- hash means to encrypt the password.

### Joi Validation API

- Joi Validation API is used to validate the data received from the client.

### Authorization nnote

- send login info to the login api.
  if login success, create JWT token :
- accessJWT, store in the cookie.
  a. if accessJWT is expired, create new accessJWT from refreshJWT.
  b. refreshJWT, store in the user table.

  - return token to the client or frontend.
  - store token in the browser cookie session.
    a. accessJWT, goes in the sessionStorage (sessionStorage is a global object meaning it is available to all the pages and is in the RAM).
    b. refreshJWT, goes in the localStorage(localStorage is available forever and is in the flash memory).

## JSON Web Token

- JWT is a json web token, a json object that contains a payload and a signature.

Step 2: Protect the API end points with JWT.

- receive the JWT token from the client as an authorization header.
- verify if accessJWT is valid.
- if accessJWT is valid, create a new accessJWT from refreshJWT.
- verify if accessJWT exists in the sessionStorage table.
- then, get the user info by email which is available in the accessJWT decode.
- do next();
- if any error, return error.

## Frontend auto login

case 1: when you are refreshing the same window, accessJWT is in the sessionStorage.
case 2; when you open link to new tab or come back to the same tab, accessJWT is in the localStorage.
