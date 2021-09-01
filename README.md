# Typescript HTTP Template
This project can be good starting point if you want to create HTTP REST API server using Typescript.

## Stack
* HTTP Server - Koa (with koa-bodyparser, koa-helmet & koa-joi-router)
* Tests - Mocha, Chai & Supertest
* Logging - Pino

## Features
* HTTP Server termination (graceful shutdown)
* Tests
* Auto restart (Nodemon)
* Visual Studio debugging (with support for auto restart)
* API docs generation (koa-joi-router-docs & redoc-cli)

## Instructions
### Run tests
```
$ npm test
```

### Run for development (no debug)
```
$ npm run dev
```

### Run for debug
```
$ npm run debug
```
After running this command you will be able to attach debugger on port `9229`

### Run & debug
Just run `Run & Debug` configuration in VS Code debug menu

### Generate docs
```
$ npm run docs
```
After running this command `static.html` file will appear in `docs` directory. Just open it in your browser.

### Build
```
$ npm run build
```

### Run dist code
After running `build` command, generated code can be quickly launched with:
```
$ npm run start
// or
$ npm start
```