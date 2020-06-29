// SERVER CODE

const express = require("express");
const http = require("http");

const app = express();
const port = process.env.PORT || 4027;
const server = http.createServer(app);

app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
    response.sendFile(__dirname + "/views/index.html");
});

// listen for requests :)
const listener = server.listen(port, () => {
    console.log(`Server is listening on port ${listener.address().port}`);
});