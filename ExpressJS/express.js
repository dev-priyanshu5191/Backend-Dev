const url = require("url");
const http = require("http");

const myServer = http.createServer((req,res)=>{
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
    const log = `${Date.now()} : ${req.method} ${req.url} "New request received\n"`
    switch(myUrl.pathname){
        case "/":
            res.end("this is home page");
            break;
        case "/about":
            res.end("this is about page");
            const username=myUrl.query.myname;
            res.end(`Hi ${username}`)
            break;
        case "/contact":
            res.end("this is contact page");
            break;
        case "/signup":
            if(req.method === "GET"){
                res.end("This is Sign Up form");
            }
            else if(req.method === "POST"){
                res.end("Success");
            }
            break;
        case "/student":
            if(req.method === "PUT"){
                res.end("This is PUT page");
            }
            else if(req.url === "PATCH"){
                res.end("Patch page");
            }
            else if(req.method === "DELETE"){
                res.end("Deleted Page");
            }
            else{
                res.end("end")
            }
            break;
        default:
            res.end("404");
    }
})

// myServer.listen(8000,()=> {
//     console.log("server started")
// });



//02-02=26 version control system

// 1st part = 5
// 2nd part = 2
// 3rd part = 1


// 1:minor fixes(optional update)

// 2: recommended bug fixes(security fixes)

// 5: major fixes - create new app to 5 ViewTransitionTypeSet

//     ^ 4.1.2

// 4.2.5
// 4.3.5
//     ^ - Install all recommended and minor fixed automatically

// ~5.2.1
// ~5.2.5
// ~5.2.1 -- 5.2.99999