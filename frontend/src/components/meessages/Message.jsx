import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import useConversion from '../../zustand/useConnversion'
import { extractTime } from '../utils/exactTime'


function Message({message}) {
	const {authUser} = useAuthContext()
	const {selectedConversion} = useConversion()
	const fromMe = message.senderId === authUser._id;
	const formatedDate = extractTime(message.createdAt)
	const chatClassName = fromMe ? 'chat-end':'chat-start'
	const profilepic = fromMe ? authUser.profilePic : selectedConversion?.profilePic;
	const bubbleBackground = fromMe ? 'bg-blue-500':'';
	const shakeclass = message.shouldShake ? "shake" :""
	return (
    <div className={`chat ${chatClassName}`}>
			<div className={`chat-image  avatar`}>
				<div className='w-10 rounded-full'>
					<img alt='' src= {profilepic}/>
				</div>
			</div>
			<div className={`chat-bubble text-white ${shakeclass}  pb-2 ${bubbleBackground}`}> {message.message}	</div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'> {formatedDate} </div>
		</div>
  )
}

export default Message