const mongoose=require("mongoose")

const CourseSchema=new mongoose.Schema({
    name:String,
    rating:Number,
    teacher:String,
    semester:String,
    enrolled:Number,
    submission:Number,

})
const SemesterSchema=new mongoose.Schema({
    name:String,
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }]
})

const StudentSchema=new mongoose.Schema({
    username:String,
    password:String,
});


const AdminSchema=new mongoose.Schema({
    username:String,
    password:String
})

const TeacherSchema=new mongoose.Schema({
    username:String,
    password:String,
    courses:[{
        type:mongoose.Types.ObjectId,
        ref:"Course"
    }]
})


const Course=mongoose.model("Course",CourseSchema);
const Teacher=mongoose.model('Teacher',TeacherSchema);
const Admin=mongoose.model('Admin',AdminSchema)
const Student=mongoose.model("Student",StudentSchema)
const Semester=mongoose.model("Semester",SemesterSchema)

module.exports={Course,Teacher,Admin,Student,Semester}
