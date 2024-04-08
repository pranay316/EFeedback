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

    const {username,password}=req.body

    const student=await Student.findOne({username})
    const teacher=await Teacher.findOne({username})
    const admin=await Admin.findOne({username})

    var type;
    

    if(!student && !teacher && !admin){
        return res.status(404).json({
            msg:"Please input the corrent username and password"
        })
    }

    let user=undefined;
    if(student){
        user=student
        type="Student"
    }
   else  if(teacher){
    user=teacher
    type="Teacher"
   }
   else{
    user=JSON.stringify(admin)
    type="Admin"
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

router.get("/totalcourses",auth,async(req,res)=>{
    try{
        const courses=await Course.find()
        return res.status(200).json({
            courses
        })
    }
    catch(err){
        return res.status(404).json({
            err
        })
    }
}
)


router.get("/teachers", auth,async (req, res) => {
    try {
        const teachers = await Teacher.find({}, { username: 1, _id: 0 }); // Project only the username field

        return res.status(200).json({
            teachers: teachers.map(teacher => teacher.username) // Extract only usernames
        });
       
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get("/allcourses",async(req,res)=>{
    const {semester}=req.query

    try{
        const semestercourses=await Semester.findOne({name:semester}).populate('courses')

        return res.status(200).json({
           semestercourses

        })
    }
    catch(err){
        return res.status(404).json({err:err})
    }
})


router.get("/course/:id",async(req,res)=>{
    const {id}=req.params
    try{
        const course=await Course.findById(id)
        return res.status(200).json({
            course
        })
    }catch(err){
        return res.status(404).json({
            err
        })
    }
})


router.post("/submitrating/:id", async (req, res) => {
    const { id } =  req.params;
    const { rating } = req.body;
 

    try {
        
        const course = await Course.findById(id);
        const oldrating=Number(course.rating)
        const oldsubmission=Number(course.submission)
        const totalRating=oldrating*oldsubmission
        const newRating=Number(rating)
        const newTotalRating=totalRating+newRating
        const newSubmission=oldsubmission+1
        const updatedRating=newTotalRating/newSubmission

     

        // Update the course document
        const updatedCourse = await Course.findByIdAndUpdate(id, {
            $set: {
                rating: updatedRating,
                submission: newSubmission
            }
        }, { new: true });

        return res.status(200).json({
            msg: "Rating has been submitted successfully",
            course: updatedCourse
        });
    } catch (err) {
        return res.status(404).json({
            err
        });
    }
});

router.post("/teachercourses", async (req, res) => {
    try {
      
      const { username } = req.body;

      const teacher = await Teacher.findOne({ username }).populate('courses', 'name rating enrolled submission semester');
      
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }
  
      res.status(200).json({ courses: teacher.courses });
    } catch (error) {
      alert('Error fetching teacher courses:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });



module.exports=router
