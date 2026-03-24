const mongoose =require("mongoose");
const connection= mongoose.connect("mongodb://localhost:27017/student")
.then(()=>{
    console.log("connection success")
}).catch((err)=>{
    console.log(err)
})

const studentSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required: true,
        min:[18,"age must be greater than equal to 18"]

    },
    email:{
    type:String
    }

});
const Student=mongoose.model("student", studentSchema);