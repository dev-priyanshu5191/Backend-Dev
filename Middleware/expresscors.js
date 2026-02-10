const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.get("/data", (req, resp) => {
    resp.json({message: "OUr site is working"});
});

// For Custom Cors 
// Frontend Allow
app.use(
    cors({   
        origin: "http://localhost:5173",    // connecting frontend for vite or react
    })
);

// Multiple Frontend Allow
const allowOrigin = [
    "http://localhost:5173",      // frontend bheja hai 
    "http://localhost:5000",      // backend bheja hai 
];
app.use(
    cors({
        origin : allowOrigin,
    })
);
app.listen(5100, () => {
    console.log("Server stared at 5100");
})