const express = require("express");
const fs = require("fs");
const users = require("./MOCK_DATA.json");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
app.get("/api/users", (req, resp) => {
    const html = `<ul>
                ${users.map((user) => `<li> ${user.first_name} ${user.last_name}</li>`).join("")}
                </ul>`;
    resp.send(html);
});
// RESTFul API

// GET Method
app.get("/users", (req, resp) => {
    resp.json({ message: "All Users", users });
});

app.get("/api/users", (req, resp) => {
    resp.json(users);
});

app.get("/api/users/:id", (req, resp) => {
    const id = req.params.id;
    const user = users.find((u) => u.id == id);
    return resp.json(user);
});

app.post("/api/users", (req, resp) => {
    // To do Create new User
    const body = req.body;
    const newuser = {
        id: users.length + 1,
        ...body,
    };
    users.push(newuser);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return resp.status(500).json({ msg: "ERROR saving user" });
        }
        return resp.status(201).json({ msg: "successfully", user: newuser });
    });
});

app.patch("/api/users/:id", (req, resp) => {
    const id = Number(req.params.id);
    const body = req.body;
    const userIndex = users.findIndex((u) => u.id === id);
    (userIndex) = { ...users[userIndex], ...body };
    if (userIndex === -1) {
        return resp.status(404).json({ msg: "user not found" });
    }
    users[userIndex] = { ...[userIndex], ...body };
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2, (err) => {
        if (err)
            return resp.status(500).json({ msg: "error updating user" });
        return resp.json({
            msg: "user updated successfully",
            user: users[userIndex],
        })
    }));
});

app.delete("/api/users/:id", (req, resp) => {
    return resp.json({ message: "User deleted Successfully" });
})
app.listen(5200, () => {
    console.log("Server Started");
})


// app.route("/api/users/:id")    // Second methid to use it
// .get((req, resp) => {
//     const id = req.params.id;
//     const user = users.find((u) => u.id == id);
//     return resp.json(user);
// });