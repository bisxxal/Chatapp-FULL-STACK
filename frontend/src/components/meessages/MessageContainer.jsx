import { useEffect } from "react";
import useConversion from "../../zustand/useConnversion";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
const MessageContainer = () => { 
	const{selectedConversion ,setSelectedConversation} = useConversion()
	
	useEffect(() => {
	 //cleanup
	 return ()=> setSelectedConversation(null)
	}, [setSelectedConversation])
	

  return (
		<div className='md:min-w-[450px] flex flex-col'>
		{
      !selectedConversion ? 	( <NoChatSelected/> )   :	(
      
      <>
         {/* Header */}
				<div className='bg-slate-500 flex items-center  gap-3 px-4 py-2 mb-2'>
				<div className='avatar  '>
    					<div className='w-9 rounded-full'>
    						<img
    							src={selectedConversion.profilePic}
    							alt='avatar'
    						/>
    					</div>
    				</div> <span className='text-gray-400 text-xl font-bold'>{selectedConversion.username}</span>
				</div>

				<Messages />
				<MessageInput />
          
			</>) 
    }
		</div>
	);
};
export default MessageContainer;


const NoChatSelected = () => {
	const { authUser } = useAuthContext();
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome <span className="text-red-500 text-[23px] font-bold"> {authUser?.username} </span>👋 ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};