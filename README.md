# Node API Server for our Admin CMS

This is a NodeJS server that serves the Admin CMS. It is a simple NodeJS server that uses ExpressJS and MongoDB.

Here is the repo for the frontend: https://github.com/bishalk21/fashiona-client-cms

## Npm packages

- express
- body-parser
- mongoose
- cors
- helmet
- dotenv

## APIs

All the api end points will follow the following pattern 
    
    `{rootUrl}/api/v1/<resource>`

### Admin user API

This api endpoint is responsible for handling all the admin user related request.

All the Admin API end points will follow the following pattern 
        
        `{rootUrl}/api/v1/admin/<resource>`

| # | PATH | METHOD | PRIVATE | DESCRIPTION |
|---|------|--------|---------|-------------|
| 1 | `/` | POST | NO |  recieves new admin user data and create new admin in our database. If admin user's email already exit, it will return error otherwise it will return success with user info from database. |
| 2 | `/verify-email` | PATCH | NO |  recieves `email verifiacation code` to verify newly create user action, returns success or error accordingly. |
| 3 | `/login` | POST | NO |  recieves `email` and `password` to login admin user, returns success or error accordingly. |


### Server Side Validation

- encrypt user password
- insert into db
- send email with verification code
- joi for server side validation
- uuidv4 for unique id for user
- bcrypt for password encryption
- nodemailer for sending email


## Authorization process 

1. User logs in with username and password
2. send login data to the login api
3. if login success, create JWTs

| `accessJWT` | `refreshJWT` |
|-----------|------------|
| store in session Table | store in cookie or user table |
| going to create for short period of time as backend server is stateless, it doesn't care where the request is coming from as long as accessJWT is valid and some hackers can access access accessjwt and access pc so we create it for short time | store in browser and everytime our access token expires, tell frontend system to create or request new access jwt from server with the help of refreshJWT |
| accessJWT is used to access protected resources | refreshJWT is used to create new accessJWT |

5. return tokens to the frontend
6. store tokens in the local storage or browser sessions
    a. accessJWT in the session storage
    b. refreshJWT in the local storage

Q. What is sessionStorage?
A. The sessionStorage property allows you to access a session Storage object for the current origin. sessionStorage is similar to localStorage, except that while data stored in localStorage has no expiration set, data stored in sessionStorage gets cleared when the page session ends — that is, when the page is closed or on reloading page to another tab.

Q. What is localStorage?
A. The localStorage property allows you to access a Storage object for the Document's origin; the stored data is saved across browser sessions. Data stored in localStorage remains forever in browser sessions, it's like storing data in ROM or hard-drive.


Q. What is JWT?
A. JSON Web Token is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

In simple terms, JWT is some piece of text or string that is used for authorizing user in the backend.

The purpose of using JWT is not to hide data but to ensure the authenticity of the data. JWT is signed and encoded, not encrypted.