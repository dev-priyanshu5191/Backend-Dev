const express = require('express');

const app = express();

app.get("/", (req, resp) => {
    resp.send("This is attendance home page");
});
app.get("/attendance", (req, resp) => {
    if(req.query.present === "yes"){
        resp.send(req.query.name + " is present");
    }
    else if(req.query.present === "no"){
        resp.send(req.query.name+" is absent");
    }
});
app.listen(5200, () => {
    console.log("Server started")
})