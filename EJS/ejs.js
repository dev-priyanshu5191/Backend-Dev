const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({recursive: true}));

// Built-in middleware 
app.set("view engine", "ejs");
app.get("/", (req, resp) => {
    resp.render("index");
});
app.listen(7400, () => console.log("Server Started at 7400"));