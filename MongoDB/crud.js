const express = require("express");
const mongoose = require("mongoose");

const app = express();

// /connect to mngodb\
mongoose.connect("mongodb://localhost:27017/blog")
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));

// create schema
const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        jobTtile: {
            type: String,
        },
        gender: {
            type: String,
        },
    },
    { timestamp: true }
);

const User = mongoose.model("User", userSchema);
app.use(express.json);
app.use(express.urlencoded({ extended: false }));

app.get("user/", async (req, res) => {
    const allDbUsers = await user.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} ${user.lastName}</li>`).join(" ")}
    `;
    res.send(html);
});

app.get("/api/users", async (req, res) => {
    const allDbUsers = await user.find({});
    res.json(allDbUsers);
});

app.post("/api/users", async (req, res) => {
    const body = req.body;
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({ msg: "all fields are required" })
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTtile: body.job_title,
    });
    console.log("result", result);
    return res.status(201).json({ mgs: "user created susccessfully", user: result, })
});

app.patch("/api/users/id:", async (req, res) => {
    await user.findByIdAndUpdate(req.params.id, { lastName: "changed" });
    return res.json({ mgs: "user updated suscessfully" });
});

app.delete("/api/users/id:", async (req, res) => {
    await user.findByIdAndDelete(req.params.id);
    return res.json({ mgs: "user deleted suscessfully" });
});


app.listen(8000, () => {
    console.log("server started")
});