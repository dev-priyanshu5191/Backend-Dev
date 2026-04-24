import express from "express";
import mongoose, { mongo } from "mongoose";
const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/none").then(() => {
    console.log("MongoDB Connected Successfully");
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

app.post("/register", async (req, resp) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({
            username, email, password
        });
        await newUser.save();
        resp.status(201).json({ msg: "Registered Successfully", user: newUser });
    } catch (err) {
        resp.status(500).json({ msg: err.message });
    }
})
app.post("/login", async (req, resp) => {
    // Validation;
    const { email, password } = req.body;
    const user = await User.findOne({
        email: req.body.email, 
        password: req.body.password,
    });
    resp.status(200).json({ msg: "User Login Successfully", user: user });
});

app.listen(5200, () => {
    console.log("Server started on 5200");
});