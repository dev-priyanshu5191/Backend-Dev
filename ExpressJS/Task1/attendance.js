const express = require('express');

const app = express();
app.use(express.json());
app.get("/", (req, resp) => {
    resp.send("This is attendance home page");
});
app.get("/attendance", (req, resp) => {
    if (req.query.present === "yes") {
        resp.send(req.query.name + " is present");
    }
    else if (req.query.present === "no") {
        resp.send(req.query.name + " is absent");
    }
    resp.send("This is student attendance page");
});
// Post request generate krna
const students = [
    { name: "Parikshit", id: 1, branch: "CSE" },
    { name: "Walter", id: 2, branch: "ECE" },
    { name: "John", id: 3, branch: "CSE" }
];
app.post("/students/add", async (req, resp) => {
    const data = req.body;
    // students.push({name:data.name, id:data.id, branch:data.branch});  /// One by one 
    students.push(data); // Collectively 
    resp.send(students);
});
app.listen(3100, () => {
    console.log("Server started")
})

