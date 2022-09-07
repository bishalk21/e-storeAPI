# Api server for the ecommerce admin cms

Here is the repo for the frontend app ....

## APIs

All the api lend points will follow the followng patterns `{rootUrl}/api/v1`

### Admin user api

This api edpoint is responsible for handeling all the admin user realated request.

All the Admin api endpoints will follow the following patterns `{rootUrl}/api/v1/admin-user`

| #   | PATH            | METHOD | PRIVATE | DESCRIPTION                                                                                                                                                                            |
| --- | --------------- | ------ | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.  | `/`             | POST   | No      | Receives new admind data and create new admin in our database. If admin user's email already exist, it will return error otherwise it will return success with user info from database |
| 2.  | `/verify-email` | PATCH  | No      | Receives `email, verificatioCode` to verify newly create user , returns success or error accordingly.                                                                                  |
| 3.  | `/login`        | POST   | No      | Receives `{email, password}` and checks if the user exist for that combination in our database, if it does, it will handle all the login process                                       |
