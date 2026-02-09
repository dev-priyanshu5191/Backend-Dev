const express = require('express');
const app = express();
app.use(express.json());
let teachers = [
    { id: 1, name: "Ruby", city: "mathura", subject: "Big Data", marks: "50" },
    { id: 2, name: "techwalker", city: "kanpur", subject: "techwalk", marks: "80" },
    { id: 3, name: "mayank", city: "Patna", subject: "principal", marks: "40" }
];
// Delete - poora data delete kr deta hai sb kuch gayab 
app.get("/teacher", (req, resp) => {
    resp.json({ message: "Out teacher", teachers });
});

// remove student by id
app.delete("/teacher/:id", (req, resp) => {
    const id = req.params.id;
    const index = teachers.findIndex((s) => s.id == id);
    console.log("index: ", index);
    const teacher = teachers[index];
    if (index == -1) return resp.json({ message: "Teacher not found" }).status(404);
    if (teacher.marks < 70) {
        const deleteteacher = teachers.splice(index, 1);   // splice:- add, remove or delete
        resp.json({ message: "Teacher deleted successfully", deleteteacher: deleteteacher[0] });
    }
    else {
        resp.json(error.message);
    }
});

app.listen(5200, () => {
    console.log("Server started");
});