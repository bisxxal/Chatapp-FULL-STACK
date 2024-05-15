import React from "react";
import useConversion from "../../zustand/useConnversion";
import { useSocketContext } from "../../context/SocketContext";
const Conversation = ({conversation , lastIndex}) => {

	const {selectedConversion ,setSelectedConversation} = useConversion()
	const isSelected = selectedConversion?._id === conversation._id;
	const {onlineUser} = useSocketContext()
	const isOnline = onlineUser.includes(conversation._id)
    	return (
    		<>
    			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? 'bg-sky-500':''}
				`}
				onClick={()=> setSelectedConversation (conversation)}
				>
    				<div className={`avatar ${isOnline ? 'online' :'   '} `}>
    					<div className='w-12 rounded-full'>
    						<img
    							src={conversation.profilePic}
    							alt='avatar'
    						/>
    					</div>
    				</div>
    
    				<div className='flex flex-col flex-1'>
    					<div className='flex gap-3 justify-between'>
    						<p className='font-bold text-gray-200'>{conversation.username}</p>
    						<span className='text-xl'>🎃</span>
    					</div>
    				</div>
    			</div>
    
    		{!lastIndex && <div className='divider px-3 py-0 my-0'></div>  }
    		</>
    	);
    };
    export default Conversation