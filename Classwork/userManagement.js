const express = require("express");
const app = express();
app.use(express.json());

const users = [
    {id: 1, name: "Hault", email: "hault@gmaail.com", role: "SWE"},
    {id: 2, name: "kumbh", email: "kumbh@gmail.com", role: "GOAT"},
    {id: 3, name: "Aryan", email: "aryan@gmail.com", role: "HUT"}
];

app.get("/users", (req, resp) => {
    resp.json({message: "All Users", users});
});

app.get("/users/:id", (req, resp) => {
    const id = req.params.id;
    const user = users.find((s) => s.id == id);
    if(!user) return resp.status(404).json({message: "User not Found"});
    resp.json({message: "User found Successfully", user});
});

app.post("/users", (req, resp) => {
    const {id, name, email, role} = req.body;

    if(!id || !name || !email || !role){
        return resp.json({message: "Enter all Credentials"});
    }
    const newuser = {id, name, email, role};
    users.push(newuser);
    resp.json({message: "User addedd Successfully", users});
});

app.put("/users/:id", (req, resp) => {
    const id = req.params.id;
    const user = users.find((s) => s.id == id);

    if(!user) return resp.status(400).json({message: "Invalid User"});

    const {newname, newemail, newrole} = req.body;

    if(newname) user.name = newname;
    if(newemail) user.email = newemail;
    if(newrole) user.role = newrole;

    resp.json({message: "User Updated Successfully"});
});

app.delete("/users/:id", (req, resp) => {
    const id = req.params.id;
    const user = users.find((s) => s.id == id);

    if(!user) return resp.status(404).json({message: "Invalid User"});

    const deleteUser = users.splice(user, 1);
    resp.json({message: "User deleted Successfully ", deleteUser});
});
app.listen(9600, () => {
    console.log("Server Started");
})
