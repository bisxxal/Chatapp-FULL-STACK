import React from 'react'
import Conversation from './Conversation'
import useGetconversation from '../../hooks/useGetconversation'
function Conversations() {
	const {loding, conversation} = useGetconversation();
 
  return (
   
        		<div className='py-2 flex flex-col overflow-auto'>
					{
						conversation.map((conversation , index)=>(
							<Conversation
							key={conversation._id}
							conversation = {conversation}
							lastIndex = {index === conversation.length - 1}
							/>
						))
					}

     			<div className='w-full h-full flex items-center justify-center'>{loding ? <span className='loading loading-spinner '></span> : "" }</div>
        		</div>
         
  )
}

export default Conversations