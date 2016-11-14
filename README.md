# React Comment Box
[![Build Status](http://54.67.109.20:8080/buildStatus/icon?job=graphql-client)](http://54.67.109.20:8080/job/graphql-client/)

This is the React comment box example from previous React tutorial

## To use

There is a simple server implementations included. It serves static files from `public/` and handles requests to `/api/comments` to fetch or add data. Start a server with the following:

### Node

```sh
npm install
node server.js
```

And visit <http://localhost:3000/>. Try opening multiple tabs!

## Changing the port

You can change the port number by setting the `$PORT` environment variable before invoking any of the scripts above, e.g.,

```sh
PORT=3001 node server.js
```
