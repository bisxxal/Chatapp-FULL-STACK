import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function userSignup() {
    const [loding, setLoading] = useState(false);
    const {authUser, setAuthUser} = useAuthContext()

  const signup = async ({ fullname, confirmpassword, username, password,  gender}) => {
    const success = handelInputError({ fullname, confirmpassword, username, password,  gender }) 
    if(!success ) return;   

    setLoading(true)
    try {
        const res = await fetch ("/api/auth/signup",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({ fullname, confirmpassword, username, password,  gender})
        })
        const data = await res.json();
        console.log(data);
        if(data.error){
            throw new Error(data.error)
        }
        // local storge
        localStorage.setItem('chat-user' ,JSON.stringify(data))
        setAuthUser(data)
        //context

    } catch (error) {
        toast.error(error.message)
    }
    finally{
        setLoading(false)
    }
};

return {loding , signup}
}

export default userSignup;

function  handelInputError({ fullname, confirmpassword, username, password,  gender }) {
 if(!fullname || !username || !confirmpassword || !gender || !password){
    toast.error('please fill the all fildes !')
    return false
  }  

     if(password !== confirmpassword){
         
         toast.error('password do not match !')
         return false
    }
     if(password.length < 6){
         toast.error('password must be at 6 charater !')
         return false
    }

return true;

}