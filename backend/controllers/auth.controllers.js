import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import geneateTokenAndSetCookie from "../utils/generateTtoken.js";
export const signup = async(req,res)=>{
    try {
        const {fullname ,confirmpassword, username,password,gender,profilePic} = req.body
        if(password !== confirmpassword) {
           return res.status(400).json ({error:"password doesn't match"});
        }  
        
        const user = await User.findOne({username})
        if(user) {
            return res.status(400).json ({error:"user alreasy exist"});
        }

        const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
		const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newuser = new User({
            fullname,
            username,
            gender,
            password:hashedPassword,
            profilePic: gender === 'male' ? boyProfilePic :girlProfilePic
        });

      if(newuser){ 
          //jwt token
          geneateTokenAndSetCookie(newuser._id ,res);
          await newuser.save()
          res.status(201).json({
            _id:newuser._id,
            fullname:newuser.fullname,
            username:newuser.username,
            profilePic:newuser.profilePic,
        })}

        else{
            res.status(400).json ({error:"invalid user data"});
        }
    } catch (error) {
        console.log("error in signup route",error);
    }
}
export const login = async(req,res)=>{
  try {
    const { username,password } = req.body
   
    const user = await User.findOne({username})
    const isPassword = await bcrypt.compare(password , user?.password ||"")
    if(!user || !isPassword) {
        return res.status(400).json({error:"invaid username or password"})
    }

    geneateTokenAndSetCookie(user._id , res);

    res.status(201).json({
        _id:user._id,
        fullname:user.fullname,
        username:user.username,
        profilePic:user.profilePic,
    })
 
  } catch (error) {
    console.log("error in login route",error);
  }
}
export const logout = (req,res)=>{

    try{
        res.cookie("jwt" , "" , {maxAge:0})
        res.status(200).json({message:"Loggedout sucessfully"})
    }
    catch (error) {
        console.log("error in logout route",error);
      }
}