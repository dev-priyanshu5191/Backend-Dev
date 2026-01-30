// const http = require('http');
const express = require('express');
const app = express()
app.get("/", (req, resp) => {
    resp.send("Our Express is working");
});
app.get("/about", (req, resp) => {
    resp.send("This is about page using express");
});
app.get("/search", (req, resp) => {
    resp.send("This is search page using express " + req.query.name+" age is "+req.query.age);   // search?name=dev&age=25
});

app.listen(8000, () => {
    console.log("Server is Started")
})
