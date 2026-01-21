const fs = require("fs");
// const promises = require('fs').promises;

// create file with sync function
// fs.writeFileSync("./file.txt", "My name is Priyanshu Varshney")

// create file with Async function
// fs.writeFile("./file.txt", "Welcome to GLA University", err=>{});

// Read a file with sync function 
// const result = fs.readFileSync("./notes.txt", "utf-8", (err, result)=>{
//     if(err){
//         console.log("Error", err)
//     } else{
//         console.log(result)
//     }
// });
// Append dat1e
// fs.appendFileSync("./file.txt", new Date().getDate().toLocaleString())
// fs.appendFileSync("./notes.txt", `${Date.now()} HELLO dev-Priyanshu \n`)

//copy file
// fs.cpSync("./file.txt", "./copyfile.txt");

// delete file
// fs.unlinkSync("./copyfile.txt");

// console.log(fs.statSync("./file.txt"))
// console.log(fs.statSync("./file.txt").isFile())

//create directory

// fs.mkdirSync("./persoanlll");
// fs.mkdirSync("./persoanlll/mine/alsomine", {recursive:true});

//remove directory
// fs.rmdirSync("./persoanlll");

// fs.readdir("./", (err, files) => {
//     if(err){
//         console.log("Error", err)
//     } else{
//         console.log(files)
//     }
// });

// Blocking and Non-Blocking Operation
// console.log("Hello");
// const result = fs.readFileSync("./notes.txt", "utf8");
// console.log(result)
// console.log("2");

// console.log("@")
// fs.readFile("./notes.txt", "utf8", (result, err) => {
//     if(err){
//         console.log("Error", err);
//     } else{
//         console.log(result)
//     }
// });
// console.log("200");

//Read Stream
// const readStream = fs.createReadStream("./file.txt", {
//     encoding: "utf-8",
//     highWaterMark: 64 * 1024
// });
// readStream.on("data", (chunk) => {
//     console.log("chunk recieved", chunk.length);
// });
// readStream.on("end", () => {
//     console.log("File read Successfully");
// });

// Write Stream
// const writeStream = fs.createWriteStream("./file.txt");
// writeStream.write("by using antigravity learn node js\n");
// writeStream.write("This is Walt H. White");
// writeStream.end();

// const writeStream = fs.createWriteStream("./sample.txt");
// writeStream.write("by using antigravity learn node js\n");
// writeStream.write("This is Walt H. White");
// writeStream.end();


// Transform Stream
const {Transform} = require("stream");
const lowerCaseTransform = new Transform({
    transform(chunk, encoding, callback){
        const modifiedData = chunk.toString().toLowerCase();
        this.push(modifiedData);
        callback;
    }
})

//Piping-flow
fs.createReadStream("./file.txt")
.pipe(lowerCaseTransform)
.pipe(fs.createWriteStream("./notes.txt"))

