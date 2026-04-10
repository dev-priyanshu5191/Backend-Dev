// const express = require('express');
// const mongoose = require('mongoose');

// const { Admin } = require('mongodb')
// const app = express();

// // Built-in Middleware
// app.use(express.json());

// // Logger Middleware
// const logger = (req, resp, next) => {
//     console.log("Method", req.method);
//     console.log("URL", req.url);
//     next();
// };

// // Apply globally for use
// app.use(logger);

// // Validation middleware
// const validate = (req, resp, next) => {
//     const {name} = req.body.name;
//     if(!name) return resp.status(400).json({message: "Name is required"});
//     next();
// }

// // Route-Specific Middleware

// const checkadmin = (req, resp, next) => {
//     // Dummy Check
//     const isadmin = true;

//     if(!admin) return resp.status(403).json({message: "Access Denied"});
//     next();
// }

// app.get("/",(req, resp) => {
//     resp.send("Welcome to home page");
// });

// app.post("/user", validate, (req, resp) => {
//     resp.json({message: "User Created Successfully", data : req.body});
// });

// app.get("/admin", checkadmin, (req, resp) => {
//     resp.send("Welcome Admin");
// });

// app.listen(3001, () => {
//     console.log("Server started oni 3001");
// })




const express = require('express');
const app = express();

// built in middleware
app.use(express.json());
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/")
.then(() => {
    console.log(" Database connected");
})
.catch((err) => {
    console.log(" Connection error:", err);
});


const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model("User", userSchema);

// logger middleware (global middleware)
const logger = (req, res, next) => {
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    next();
};

// apply the logger middleware to all routes
app.use(logger);

//validation middleware (route level middleware)
const validate = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ 
            msg : "Name is required" });
    }
    next();
};

//route-specific middleware
const checkAdmin = (req, res, next) => {
    // dummy check for admin role(JWT token or session can be used in real application)
    const isAdmin = true; // change to false to test non-admin access
    if (!isAdmin) {
        return res.status(403).json({ 
            msg : "Access denied - Admin only" });
    }
    next();
};

// home route
app.get('/', (req, res) => {
    res.send("Welcome to the home page");}   
);

// validation middleware applied to this route
app.post("/user", validate, (req, res) => {
    const newUser = new User(req.body);
    newUser.save();
    res.json({ 
        msg : "User created successfully", 
        user: req.body });
});

// route-specific middleware
app.get("/admin", checkAdmin, (req, res) => {
    res.send("welcome admin");
});

app.listen(3000, () => {
    console.log("Server started ");
});