const express = require("express");
const app = express();

function responseTimeLogger(req, res, next) {
    const startTime = Date.now();

    res.on("finish", () => {
        const endTime = Date.now();
        const duration = endTime - startTime;

        console.log(`${req.method} ${req.url} → ${duration}ms`);
    });

    next();
}

app.get("/", responseTimeLogger, (req, res) => {
    res.send("Home Page");
});

app.get("/users", responseTimeLogger, (req, res) => {
    setTimeout(() => {
        res.json([
            { id: 1, name: "Dhriti" },
            { id: 2, name: "Atharv" }
        ]);
    }, 300);
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
