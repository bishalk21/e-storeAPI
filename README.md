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


