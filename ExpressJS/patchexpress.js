const express = require('express');
const app = express();
app.use(express.json());

let students = [
    { id: 1, name: "Hulk", marks: 50, city: "Prayagraj", status: "active" },
    { id: 2, name: "jatin", marks: 80, city: "Delhi", status: "active" }
];
// PATCH - update any one field at a time
app.get("/", (req, resp) => {
    resp.json("This is patch request");
});

app.get("/students", (req, resp) => {
    resp.json({ message: "Our Students", students });
});

app.patch("/students/:id", (req, resp) => {    // student/2 = /2 is ID  
    const id = req.params.id;
    const update = req.body;

    const student = students.find((s) => s.id == id);
    if (!student) return resp.json({ message: "Student not found" }).status(404);

    Object.assign(student, update);

    if (user) {

    }
    resp.json({ message: "Student found successfully", student });
});

// Status active or not 
app.patch("/students/:id/status", (req, resp) => {
    const id = req.params.id;
    const { status } = req.body;
    const student = students.find(s => s.id == id);
    if (!student) return resp.status(404).json({ message: "Student not found" });
    if (status !== "active" && status !== "inactive") {
        return resp.status(400).json({ message: "Status is not active" });
    }
    student.status = status;
    resp.json({ message: "Student status updated successfully", student });
});

app.listen(7400, () => {
    console.log("Server started");
});
