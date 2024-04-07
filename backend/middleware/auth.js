const jwt=require("jsonwebtoken")
const { Admin } = require("../models/model")


exports.auth=async(req,res,next)=>{
    try{
const token=req.header("authorization")
const data=await jwt.verify(token,process.env.JWT_SECRET)
const admin=await Admin.findOne({username:data.username})
if(!admin){
    return res.status(400).json({
        msg:"Please login as Admin first"
    })
}


// return res.json({
//     "admin":admin,
//    "msg": "It is admin"
// })

next()
    }catch(err){
        return res.status(400).json({
            msg:"Please login before as admin"
        })
    }
}