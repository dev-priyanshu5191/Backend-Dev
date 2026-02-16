const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
app.use(express.urlencoded({extended: "true"}));
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

app.listen(5200, () => {
    console.log("Server Started");
})