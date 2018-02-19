# angular2-node-fb-login
Demo application that shows how implement Facebook login with Angular 2 on frontend and Node.js/Express on backend that is implementing REST API.

Forked from https://github.com/GenFirst/angular2-node-fb-login

# About

This application was created as material that is described in [the blog post](https://medium.com/@robince885/node-js-rest-api-facebook-login-121114ee04d8).
As Angular 2 seed we have used project that is described in [post](https://medium.com/@robince885/angular-2-project-with-bootstrap-1e6fc82dc017) that we have published earlier. 

# What you need to install

* [Node.js](https://nodejs.org/en/)
* [Angular CLI](https://cli.angular.io/)
* [Gulp](http://gulpjs.com/)
* [MongoDB](https://www.mongodb.com/)

# How To Start Application?

* Start MongoDB - our application expects that there is `fb-demo` database in MongoDB
* Fill in backend/.env file. Follow .env.example for template.
* Go to [frontend](https://github.com/GenFirst/angular2-node-fb-login/tree/master/frontend) folder
    * `npm install`
    * `ng serve`
* Go to [backend](https://github.com/GenFirst/angular2-node-fb-login/tree/master/frontend) folder
    * `npm install`
    * `gulp develop`

# Notes
## Auth flow
Login flow
- FE: FB.login gives access token
- FE: call api/v1/auth/facebook with the access token
- BE: server.js /auth/facebook gets triggered and call passport.authenticate
- BE: passport.js strategy gets invoked. 
- BE: User.upsert gets called, ensuring a user exists in db.
- BE: server.js authenticate callback now runs with the db model user.
  - The token format is {id: user.id}, where user = db model user.
- FE: saves jwt in local storage

On subsequent requests
- FE: app.module, because of getAuthHttp, will autoattach token from storage to the x-auth-token header.
- BE: server.js auth/me converts the JWT (which has db model user id) to full user object.
- BE: backend api call can then operate on the full user model.
# License

angular2-node-fb-login is released under [MIT License](https://opensource.org/licenses/MIT).
