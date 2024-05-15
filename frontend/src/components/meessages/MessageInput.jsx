import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
const [message , setMessaage] =useState()
const {loading , sendMessage} = useSendMessage()
 
const handelSumbit = async(e)=>{
	e.preventDefault();
		if(!message){ return;}
		await sendMessage(message)
		setMessaage('')
	}
	return (
		<form className='px-4 my-3' onSubmit={handelSumbit}>
			<div className='w-full relative'>
				<input
					type='text'
					className='border text-sm rounded-lg block w-full p-2.5 pr-[29px] bg-gray-700 border-gray-600 text-white'
					placeholder='Send a message'
				onChange={(e)=> setMessaage(e.target.value)}
				/>
				<button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
				 {loading ? <span className='loading loading-spinner '></span> :  <BsSend /> } 
				</button>
			</div>
		</form>
	);
};
export default MessageInput;