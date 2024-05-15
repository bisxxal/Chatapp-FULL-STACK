import User from "../models/user.models.js";

export const getUserForSidebar = async(req ,res)=>{
 try {
    const loggedInUser = req.user._id
    const filteredUser = await User.find({_id:{$ne:loggedInUser}}).select("-password") // this show all user but expect you(login users)

    res.status(200).json(filteredUser)
    
    
 } catch (error) {
    console.log('erorr in getUserForSidebar ', error.message);
    res.status(500).json({error:'internal error '})
 }
}