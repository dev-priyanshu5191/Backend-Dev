//  auth pattern 
// 1- statefull - which maintains states or data on server side 
// 2- stateless - which has no state


const express = require("express");
const session = require("express-session");
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const { use } = require("react");
const app = express();

// built - in json 

app.use(express.json());
// connect-mongodb

mongoose.connect("mongodb://127.0.0.1:27017/authDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// seesion configure
app.use(session({
    secret: "mySceretKey123",
    resave: false, //data yahan se bhej rhe h and not from json
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,// 1 hour
        httpOnly: true,// condition true = http request h 
    },

}),);

//  dummy database
const users = [];

// schema
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "user"
    }
});

const User = mongoose.model("User", userSchema);
// password validation 

function validatePassword(password) {

    const error = [];
    if (password.length < 8) error.push("Min 8 character required");
    if (!/[A-Z]/.test(password)) error.push("1 upper case required");
    if (!/[a-z]/.test(password)) error.push("1 lower case required");
    if (!/[0-9]/.test(password)) error.push("1 number required");
    if (!/[!@#$%&^*]/.test(password)) error.push("1 symbol required");

    return {
        isValid: error.length === 0,
        error,
    };

};

// check login 

function isAuthenticated(req, res, next) {
    if (req.session.userId) {
        return next();
    }
    return res.status(401).json({
        msg: "Login required!"
    });
}

//  check role 

function requiredRole(role) {
    return (req, res, next) => {
        const user = users.find((u) => u.id === req.session.userId);
        if (!user || user.role !== role) {
            return res.status(403).json({
                msg: "Access denied"
            });
            next();
        }
    }
}

//  registration page 

app.post("/register", async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                msg: "all fields are required"
            });
        }
        const existUser = users.find((u) => u.email === email);
        if (existUser) {
            return res.status(409).json({
                msg: "user user already exist"
            });
        }

        const validation = validatePassword(password);
        if (!validation.isValid) {
            return res.status(400).json({ error: validation.error });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: users.length + 1,
            username,
            email,
            password: hashedPassword,
            role: role || "user",
        };
        users.push(newUser);
        res.status(201).json({
            msg: "User registered",
            user: {
                id: newUser.id,
                username,
                email,
                role: newUser.role
            },
        });
    } catch (err) {
        res.status(500).json({
            msg: "error"
        });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = users.find((u) => u.email === email);

        // Email not found
        if (!user) {
            return res.status(401).json({
                msg: "Invalid Email"
            });
        }

        // Password incorrect
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                msg: "Invalid Password"
            });
        }
        // Both email and password incorrect
        if (!user) {
            return res.status(401).json({ msg: "User does not exist" });
        }
        // Success
        req.session.userId = user.id;

        res.json({
            msg: "Login Successfully",
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({ msg: "Error" });
    }
});

// Profile(Protected)
app.get("/profile", isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId).select("-password");
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        res.json({
            msg: "Profile Data",
            user
        });
    } catch (err) {
        res.status(500).json({ msg: "Error" });
    }
});

// all profile
app.get("/allprofile", isAuthenticated, async (req, res) => {
    try {
        console.log("Session UserID:", req.session.userId);

        const users = await User.find().select("-password");

        console.log("Users:", users);

        res.json({
            msg: "All Users",
            users
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error" });
    }
});

//Admin
app.get("/admin", isAuthenticated, requiredRole("admin"), (req, resp) => {
    resp.json({ msg: "Welcome Admin" });
});

//Logout
app.post("/logout", (req, resp) => {
    resp.session.destroy(() => {
        resp.json({ msg: "Logged Out Successfully" });
    });
});

// forgot password
app.post("/forgot-password", async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const user = users.find((u) => u.email === email);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const validation = validatePassword(newPassword);
        if (!validation.isValid) {
            return res.status(400).json({ error: validation.error });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        res.json({ msg: "Password updated successfully" });

    } catch (err) {
        res.status(500).json({ msg: "Error" });
    }
});

app.listen(6300, () => {
    console.log("server started on 6300");
});
