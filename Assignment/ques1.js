const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const users = [
    {id: 1, name: "Dhriti"},
    {id: 2, name: "Atharv"},
    {id: 3, name: "dhuchi"}
];

app.get("/users", (req, resp) => {
    const searchName = req.query.name;
    
    if(!searchName) return resp.json({message: "All Users", users});

    const searchUser = users.filter(user => {
        return user.name.toLowerCase().includes(searchName.toLowerCase());
    });
    resp.json({message: "Searched User: ", searchUser});
});

app.listen(6300, () => {
    console.log("Server started at 6300");
});
