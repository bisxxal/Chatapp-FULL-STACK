import React, { useState,useEffect } from "react";
import toast from "react-hot-toast"; 
import useConversion from "../zustand/useConnversion";

function useGetMessage() {
    const [loading, setLoading] = useState(false);
    const {messages ,setMessages,selectedConversion } = useConversion()
 
 useEffect(() => {
    const getMessage = async (message) => {
        
        setLoading(true)
        try {
            const res = await fetch (`/api/messages/${selectedConversion._id}` )
            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }
           
            setMessages(data);
           
    
        } catch (error) {
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    };

    if(selectedConversion?._id) getMessage()
 }, [ selectedConversion?._id , setMessages])
 

return {loading , messages}
}

export default useGetMessage;

 