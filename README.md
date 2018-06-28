## Botler :memo:

## Stack-tech :dart:

### Back-end :wrench:
- [x] Expressjs
- [x] JWT
- [x] MongoDB
- [x] Mongoose
- [x] Mocha & Chai (TDD)
- [x] Istanbul for Code Coverage
- [x] Travis-CI

---

## Open Endpoints

Open endpoints require no Authentication.

* Login : `POST /api/users/login/`
* Create user : `POST /api/users/register`

## Endpoints that require Authentication

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above.

### Current User related

Each endpoint manipulates or displays information related to the User whose
Token is provided with the request:

* Show user detail : `GET /api/users/me`
* Delete user token : `DELETE /api/users/logout`
