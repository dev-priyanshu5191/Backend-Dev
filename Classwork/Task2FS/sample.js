const fs = require("fs");

const writeStream = fs.createWriteStream("./sample.txt");
writeStream.write("GUUGUGUUGUGUUGUUG");
writeStream.end();

const readStream = fs.createReadStream("./sample.txt", {
    encoding:"utf-8", 
    highWaterMark: 64*1024
});
readStream.on("data", (chunk) => {
    console.log("Chunk Recieved: ", chunk.length)
});
readStream.on("end", () => {
    console.log("File read Successfully")
});


