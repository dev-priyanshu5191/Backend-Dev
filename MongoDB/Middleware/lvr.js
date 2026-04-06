const express = require('express');
const mongoose = require('mongoose');

const { Admin } = require('mongodb')
const app = express();

// Built-in Middleware
app.use(express.json());

// Logger Middleware
const logger = (req, resp, next) => {
    console.log("Method", req.method);
    console.log("URL", req.url);
    next();
};

// Apply globally for use
app.use(logger);

// Validation middleware
const validate = (req, resp, next) => {
    const {name} = req.body.name;
    if(!name) return resp.status(400).json({message: "Name is required"});
    next();
}

// Route-Specific Middleware

const checkadmin = (req, resp, next) => {
    // Dummy Check
    const isadmin = true;

    if(!admin) return resp.status(403).json({message: "Access Denied"});
    next();
}

app.get("/",(req, resp) => {
    resp.send("Welcome to home page");
});

app.post("/user", validate, (req, resp) => {
    resp.json({message: "User Created Successfully", data : req.body});
});

app.get("/admin", checkadmin, (req, resp) => {
    resp.send("Welcome Admin");
});

app.listen(3001, () => {
    console.log("Server started oni 3001");
})