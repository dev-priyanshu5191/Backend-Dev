const express = require('express');
const session = require('express-session');

const app = express();
// Built-in Middleware
app.use(express.json());

app.use(
    session({
        secret: "none123",  // encrypted session-id
        resave: false,
        saveUninitialized: false,
        cokkie: {
            maxAge: 60*60*1000,  // for 1-hour
            httpOnly: true,
        },
    }),
);
// Lgogin (Create Session)
app.post("/login", (req, resp) => {
    const {username, password} = req.body;
    // Dummy Authentication
    if(username === "admin" && password == "123"){
        req.session.user = {
            username : username,
            role: "admin",
        };
        return resp.json({
            msg: "Login Succrssfully",
            sessionId : req.sessionID,
        });
    }
    resp.status(401).json({msg: "Invalid Credentials"});
});

// Profile (Protected)
app.get("/profile",(req, resp) => {
    if(!req.session.user){
        return resp.status(401).json({message: "Please Login First"});
    }
    resp.json({msg: "User Profile",
        user: req.session.user,
    });
});

// Dashboard(Protected)
app.get("/dashboard", (req, resp) => {
    if(!req.session.user){
        return resp.status(401).json({
            msg: "Unauthorized User"
        });
    }
    resp.send(`Welcome ${resp.session.user.username}`);
});

//Logout (Destroy Session)
app.get("/logout", (req, resp) => {
    resp.session.destroy((err) => {
        if(err){
            return resp.status(500).send("Error logging out");
        }
        resp.clearCookie("connect.sid");  // Default cokkie name
        resp.send("Logout Successfully");
    })
});

//check session
app.get("check-session",(req,res)=>{
    if(req.session.user){
        res.json({
            msg: "session active",
            user: req.sesssion.user,
        });
    }else{
        res.json({
            msg: "no active session",
        });
    }
});

app.listen(6300, () => {
    console.log("Server started ");
});