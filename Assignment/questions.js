const fs = require("fs");
fs.writeFileSync(
    "./answers.txt",
    "Answer-1: \nSynchronous:- Program will wait until the file operation is finished, then it will move to the next line \n"+
    "Asynchronous:- Program does not wait other works will happen in background and when it finishes it return via callback function",
    "utf-8"
);

fs.appendFileSync(
    "./answers.txt",
    "\nAnswer-2: \nWhen our file is too large we use Streams to read the file in small chunks, so memory stay safe",
    "utf-8"
);

