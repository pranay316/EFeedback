const express=require("express")
const { Student,Teacher,Admin, Course, Semester } =require( "../models/model");
const jwt=require("jsonwebtoken")
require("dotenv").config()
const {auth}=require("../middleware/auth")



const router=express.Router()


router.get('/',(req,res)=>{
    return res.json({
        "Message":"Server is running succerfully"
    })
})


router.post("/signup",async (req,res)=>{
   const {username,password}=req.body;
   const present=await Admin.find()
   console.log(present)
   if(present.length>0){
    return res.status(404).json({
        "present":present,
        msg:"Admin is already present"
    })

   }
   const user=await Admin.create({username,password});
   


   return res.status(200).json({
    msg:"Admin is being created successfully"
   })

})

router.post("/createstudent",auth,async(req,res)=>{
    
    const {username,password}=req.body;
    const present=await Student.findOne({username:username})
    if(present){
        return res.status(400).json({
            msg:"Student is already being created using this username"
        })
    }
    const user=await Student.create({username,password})
    return res.status(200).json({
        msg:"Student is being created succefully"
    })
})

router.post("/createteacher",auth,async(req,res)=>{
    const {username,password}=req.body
    const present=await Teacher.findOne({username:username})
    if(present){
        return res.status(400).json({
            msg:"Teacher is already being created using this username"
        })
    }
    const user=await Teacher.create({username,password})

    return res.status(200).json({
        msg:"Teacher is being created succefully"
    })

})

router.post("/login",async(req,res)=>{
    console.log("In login backend")
    const {username,password}=req.body
    console.log("Usernam and pass is",username,password)
    const student=await Student.findOne({username})
    const teacher=await Teacher.findOne({username})
    const admin=await Admin.findOne({username})
    console.log("student teacher and admin ",student ,teacher,admin)
    var type;
    

    if(!student && !teacher && !admin){
        return res.status(404).json({
            msg:"Please input the corrent username and password"
        })
    }
    console.log("IT IS BEING DONE")
    let user=undefined;
    if(student){
        user=student
        type="Student"
    }
   else  if(teacher){
    user=teacher
    type="teacher"
   }
   else{
    user=JSON.stringify(admin)
    type="admin"
   }

    const token=await jwt.sign({username,password},process.env.JWT_SECRET)

    return res.status(200).json({
        type:type,
    
        token:token
    })

})


router.post("/createcourse",auth,async(req,res)=>{


    const {name,teacher,semester,enrolled}=req.body;

    try{
        

    const course=await Course.create({name:name,
        rating:0,teacher:teacher,semester:semester,
        enrolled:enrolled,submission:0 })

        const userTeacher= await Teacher.findOne({username:teacher})
      

        const updateTeacher=await Teacher.findByIdAndUpdate({_id:userTeacher._id},{
            $push:{
                courses:course._id
                
            }
        },{new:true})

        const semesterUpdate=await Semester.findOne({name:semester})
        if(!semesterUpdate){
            const newSemester=await Semester.create({name:semester,courses:[course._id]})
          
        }
        else{
            const update=await Semester.findOneAndUpdate({name:semester},{
                $push:{
                    courses:course._id
                }
            },{new:true})
           

        }

        return res.status(200).json({
            msg:"course is being created successfully",
            courseDetails:course
        })

    }catch(err){
        return res.status(400).json({
            err
        })
    }
})



router.get("/allcourses",async(req,res)=>{
    const {semester}=req.body

    try{
        const courses=await Semester.findOne({name:semester}).populate('courses')

        return res.status(200).json({
           courses

        })
    }
    catch(err){
        return res.status(404).json({err:err})
    }
})





 





module.exports=router
