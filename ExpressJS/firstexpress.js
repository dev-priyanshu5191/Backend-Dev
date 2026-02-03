// const http = require('http');
// const express = require('express');
// const app = express()
// app.get("/", (req, resp) => {
//     resp.send("Our Express is working");
// });
// app.get("/about", (req, resp) => {
//     resp.send("This is about page using express");
// });
// app.get("/search", (req, resp) => {
//     resp.send("This is search page using express " + req.query.name+" age is "+req.query.age);   // search?name=dev&age=25
// });

// app.listen(8000, () => {
//     console.log("Server is Started")
// })

const express = require('express');

const app = express();
app.use(express.json());
app.get("/", (req, resp) => {
    resp.send("This is attendance home page");
});
app.get("/attendance", (req, resp) => {
    if (req.query.present === "yes") {
        resp.send(req.query.name + " is present");
    }
    else if (req.query.present === "no") {
        resp.send(req.query.name + " is absent");
    }
    resp.send("This is student attendance page");
});

const credentials = [
    { email: "user@gmail.com", password: "12345" },
    { email: "test@gmail.com", password: "56789" }
];
app.post("/auth/register", async (req, resp) => {
    const data = req.body;
    // Check is user already exists
    const existUser = credentials.find((cred) => cred.email == data.email && cred.password == data.password);
    if (existUser) {
        return resp.status(400).send("User already exists");
    }
    credentials.push(data);
    resp.send("Registation Successfull");
});

app.post("/auth/login", async (req, resp) => {
    const { email, password } = req.body;
    const user = credentials.find(
        (cred) => cred.email == email && cred.password == password
    );
    console.log(user);
    if (user) {
        resp.send({ message: "Login Successfully", user });
    } else {
        resp.send("Invalid Credentials");
    }
});
app.listen(6200);
