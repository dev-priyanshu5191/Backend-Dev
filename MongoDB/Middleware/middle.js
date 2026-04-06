const express = require('express');
const app = express();

app.use((res, resp, next) => {
    console.log("Sign Up Form");
    next();
});

app.use((req, resp, next) => {
    console.log("Login Form");
    next();
});

app.get("/user", (req, resp) => {
    resp.send("Route Executed");
});

app.listen(6300, () => {
    console.log("Server started on 6300");
});