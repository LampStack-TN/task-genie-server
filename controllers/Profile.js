const User = require("../database/prisma").user;

const getUserProfile= async(req,res)=>{
    try{
        const { userId } = req;
const profile=User.findUnique({
where:{
    id:userId
},
include:{
    profile:true
}
})
res.send(profile)
    }
    catch(error){
        console.log(error);
        res.status(400).send("Unvalid Profile");
    }
}
module.exports={getUserProfile}