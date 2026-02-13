const express = require("express");
const app = express();

app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.send("Home Index");
});


app.use((req, res) => {
    res.status(404).render("404 page not found");
});


app.listen(3300, () => {
    console.log("Server running on port 3000");
});
