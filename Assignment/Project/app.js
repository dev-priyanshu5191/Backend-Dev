const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));

app.get("/contact", (req, resp) => {
    resp.render("contact");
});

app.post("/contact", (req, resp) => {
    const {name, email, message} = req.body;
    resp.render("success", {name, email, message});
});

app.listen(5100, () => {
    console.log("Server started on 5100");
})