const express = require('express');
const app = express();
app.use(express.json());

let credentials = [
    { email: "yoyo@gmail.com", password: "905859" },
    { email: "baba@gmail.com", password: "5191" }
];
app.get("/", (req, resp) => {
    resp.send("Hello, this side KK");
});
app.get("/auth/register", (req, resp) => {
    resp.json({ message: "User Fetched successfully", credentials });
});

// PUT - modify 
// Reset Password 
app.put("/auth/reset", (req, resp) => {
    const { email, password, newPassword } = req.body;
    // find user 
    const user = credentials.find(
        (cred) => cred.email == email && cred.password == password,
    );
    if (!user) return resp.json({ message: "Invalid email or password" });
    // update password
    user.password == newPassword;
    resp.json({ message: "Updated password successfully", user });
});

// Forgot Password
app.put("/auth/forgot", (req, resp) => {
    const { email, newPassword } = req.body;
    const user = credentials.find(
        (cred) => cred.email == email
    );
    if (!user) return resp.json({ message: "Invalid User" });
    user.password = newPassword;
    resp.json({ message: "Forgot Password successfully", user });
});

// Change E-mail 
app.put("/auth/email", (req, resp) => {
    const {newemail, password} = req.body;
    const user = credentials.find(
        (cred) => cred.password = password
    );
    if(!user) return resp.json({message: "Invalid User"});
    user.email = newemail;
    resp.json({message: "E-mail Changed Successfully", user});
});


// PATCH - 
app.listen(2300, () => {
    console.log("Server started");
});