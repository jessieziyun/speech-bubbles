// SERVER CODE
require("dotenv").config()
const express = require("express");
const http = require("http");

const app = express();
const port = process.env.PORT || 3000;
const base = process.env.BASE || "/";
const server = http.createServer(app);

app.use(base, express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get(base, (request, response) => {
    response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = server.listen(port, () => {
    console.log(`Server is listening on port ${listener.address().port}`);
});