# CryptoNewZ API
A REST API built with Node.js and MongoDB.

CryptoNewZ pulls cryptocurrency news articles from many sources, stores them in a MongoDB database and serves them to clients in JSON form.

Clients can freely GET all articles/comments, and POST comments on each article. Other HTTP verbs (PUT, DELETE) are restricted to Admin use only, where Admin accounts are authenticated using JSON Web Tokens. The API is available for public use, only Admins can signup/login.

## Using the API

### Public Queries:

GET Homepage: [https://agile-coast-67507.herokuapp.com/](https://agile-coast-67507.herokuapp.com/)

GET all articles: [https://agile-coast-67507.herokuapp.com/articles](https://agile-coast-67507.herokuapp.com/articles)

GET individual article (append article ID): [https://agile-coast-67507.herokuapp.com/articles/62e4c48c9c26556fa1845043](https://agile-coast-67507.herokuapp.com/articles/62e4c48c9c26556fa1845043)

GET all comments (on individual article): [https://agile-coast-67507.herokuapp.com/articles/62e4c48c9c26556fa1845043/comments](https://agile-coast-67507.herokuapp.com/articles/62e4c48c9c26556fa1845043/comments)

GET individual comment (append comment ID): [https://agile-coast-67507.herokuapp.com/articles/62e4c48c9c26556fa1845043/comments/62e4d6e822be03020e31e94c](https://agile-coast-67507.herokuapp.com/articles/62e4c48c9c26556fa1845043/comments/62e4d6e822be03020e31e94c)

POST new comment (on individual article): [https://agile-coast-67507.herokuapp.com/articles/62e4c48c9c26556fa1845043/comments](https://agile-coast-67507.herokuapp.com/articles/62e4c48c9c26556fa1845043/comments) --> Requires the HTTP Body to be populated with the Comment in JSON form as follows:
```json
{
  "name":"George",
  "content":"This is my first comment!"
}
```
## News Sources

- [CryptoPanic API](https://cryptopanic.com/developers/api/)
- More to come!

## Development Overview

I built this REST API to get familiar with the following concepts:

- User authentication with [Passport.js](https://www.passportjs.org/)
- Using JSON Web Tokens for user authentication.
- Organising URIs and serving backend content in a REST architecture.
- Express.js: routing based on http requests.
- Mongoose: modeling, storing and accessing MongoDB documents.
- Deploying an Express app to [Heroku](https://www.heroku.com/).
- Using environment variables to protect sensitive info (DB credentials, Admin Password).
- Using Node-Fetch to request resources from other APIs.

### Tech used

- [Heroku](https://www.heroku.com/) for hosting.
- [npm](https://www.npmjs.com/) for dependencies.
- [Express.js](http://expressjs.com/) for serving and middleware.
- [Mongoose ODM](https://mongoosejs.com/) for the backend.
- [Passport.js](https://www.passportjs.org/) for user authentication.
