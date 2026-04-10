const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req, resp) => {
    resp.sendFile(__dirname+"/index.html");
});

app.post("/login", (req, resp) => {
    const {username} = req.body;
    resp.cookie("user", username, {
        maxAge: 24*60*60*1000
    });
    resp.send("Cookie Stored form Form");
});
// Profile
app.get("/profile", (req, resp) => {
    if(!req.cookies.user){
        return resp.send("No User Logged in");
    }
    resp.send(`Hello ${req.cookies.user}`);
});

// Delete Cookie
app.get("/logout", (req, resp) => {
    resp.clearCookie("user");
    resp.send("Cookie Deleted (User Logged Out)");
});

// Dashboard
app.get("/dashboard", (req, resp) => {
    // const {username} = req.body;
    resp.cookie("",{
        maxAge: 5*1000,
    });
    
})
app.listen(8000, () => {
    console.log("Server Started ");
})