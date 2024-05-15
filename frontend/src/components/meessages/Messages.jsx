import useGetMessage from "../../hooks/useGetMessage";
import Message from "./Message";
import MessageSkeleton from '../secleton/MessageSkeleton '
import { useRef ,useEffect } from "react";
import useListenMessages from "../../hooks/useListenMessages";
const Messages = () => {
	 
	const {messages , loading} = useGetMessage()
	const lastMessageRef = useRef()
	useListenMessages()
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);
	return (
		<div className='px-4 flex-1 overflow-auto'>
		 {!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div  key={message._id}  ref={lastMessageRef}>
						<Message message={message} />
				  </div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center font-medium text-[18px] mt-[200px]'>Send a message to start the conversation !!</p>
			)}
			{/* <Message /> */}
		</div>
	);
};
export default Messages