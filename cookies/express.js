const express = require('express');
const cokkieParser = require("cookie-parser");

const app = express();

// Built-in Middleware
app.use(express.json());
app.use(cokkieParser());

app.get("/set-cookie", (req, resp) => {
    resp.cookie("username", "None", {
        maxAge: 24*60*60*1000,  // 1-Day
        httpOnly: true
    });
    resp.send("Cookie has been set");
});

app.get("/get-cookie", (req, resp) => {
    const user = req.cookies.username;
    if(user){
        resp.send(`Hello ${user}`);
    } else{
        resp.send("No cookie found");
    }
});

app.get("/delete-cookie", (req, resp) => {
    resp.clearCookie("username");
    resp.send("Cookie Deleted");
});

app.post("/set-preferences", (req, resp) => {
    const {theme, language} = req.body;
    const data = {
        theme : theme || "light",
        language : language || "english"
    };
    resp.cookie("prefernces", JSON.stringify(data), {
        maxAge: 7*24*60*60*1000,
    });
    resp.json({
        msg: "Prefernce Saved",
        data
    });
});

app.get("/get-prefernces", (req, resp) => {
    const pref = req.cookies.preferences;
    if(!pref){
        return resp.send("No Prefernces Found");
    }
    const parsed = JSON.parsed(pref);
    resp.json(parsed);
});

app.listen("9600", () => {
    console.log("Server started on 9600");
});