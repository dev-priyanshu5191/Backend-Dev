const express=require('express');
const app = express();
app.use(express.json());

app.get("/", (req, resp) => {
    resp.status(200, {"Content-type":"text/html"});
    resp.send(`
        <form>
        <input type ='text' placeholder="Enter Your Name" name='name'/>
        <input type='text' placeholder="Enter your Email" name='email'/>
        <button> Submit </button>
        </form>`
    )
});
app.listen(8100, () => {
    console.log("Server started");
});