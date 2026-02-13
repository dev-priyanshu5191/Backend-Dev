const express = require("express");
const app = express();
app.use(express.json());

const users = [
    {email: "user@gmail.com", password: "12345"},
    {email: "none@gmail.com", password: "5236"}
];
const Stoken = "SECRETTOKEN";
app.get("/",(req, resp) => {
    resp.json({mesaage: "Users", users});
});

app.post("/login", (req, resp) => {
    const {email, password} = req.body;
    const user = users.find((u) => u.email == email && u.password == password);

    if(!user) return resp.json({message: "User Not Found 404"});

    resp.json({mesaage: "Login Successfully", Stoken});
});

const authMiddleware = (req, resp, next) => {
    const token = req.headers.authorization;

    if (!token || token !== Stoken) {
        return resp.status(401).json({ message: "Unauthorized" });
    }
    next();
};

app.get("/dashboard", authMiddleware, (req, resp) => {
    resp.json({message: "This is our Main Dashboard"});
});

app.get("/profile", authMiddleware, (req, resp) => {
    resp.json({message: "Profile Page", users});
});

app.listen(5200, () => {
    console.log("Server Started");
})