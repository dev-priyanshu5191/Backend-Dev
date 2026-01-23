const http = require('http');
const fs = require('fs');

fs.writeFile("./task1.txt", "GLA University", 'utf-8', () => {});
const res = fs.readFile("./task1.js", "utf-8", (err, result) => {
    if(err){
        console.log("Error",err);
        
    }
    else{
        console.log(res);
    }
});
// const arg = process.argv;
// const port = arg[2]
// http.createServer((req, resp) => {
    
// }).listen(port)

// console.log(fs.statSync("./task1.txt"))
// console.log(fs.statSync("./task1.txt").isFile())