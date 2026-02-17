const express = require("express");
const fs = require('fs');
const app = express();
const users = require("./MOCK_DATA.json");
const { json } = require("stream/consumers");
app.use(express.urlencoded({extended: false}));


app.get("/api/users", (req, resp) => {
    resp.json(users);
});

app.post("/api/users", (req, resp) => {
    const {first_name, last_name, email, gender, job_title} = req.body;
    const newUser = {
        id: users.length+1,
        first_name,
        last_name,
        email,
        gender,
        job_title
    };
    users.push(newUser);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), () => {
        resp.status(201).json({message: "User created Successfully", user:newUser});
    });
});

app.patch("/api/users/:id", (req, resp) => {
    const id = req.params.id;
    const userIndex = users.findIndex((s) => s.id == id);
    if(userIndex == -1) return resp.status(401).json({message: "User not found"});
    users[userIndex] = {
        ...users[userIndex], 
        ...req.body,
    };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), () => {
        resp.json({msg: "User Updated Successfully", user : users[userIndex]});
    });
});


app.listen(6300, () => {
    console.log("Server Started");
})