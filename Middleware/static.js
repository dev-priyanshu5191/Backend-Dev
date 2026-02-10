const express = require('express');
const app = express();

app.use(express.static("public"));    // with a help of this cmd we can access any file using routing
app.listen(8000, () => {console.log("Server started")});
// Serve files from 'public' directory

// Absolute Path:- c\user\desktop\filename
// Relative Path:- ./public/filename

// const staticPath = __dirname + "/public"
// Dusra method file read krne ka
// const fullPath = path.join(__dirname, "public", "index.html")
