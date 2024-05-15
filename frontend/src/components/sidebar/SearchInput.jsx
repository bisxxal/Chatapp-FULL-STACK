import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5"; 
import useConversion from '../../zustand/useConnversion'; 
import useGetconversation from '../../hooks/useGetconversation';
import toast from 'react-hot-toast';
function SearchInput() {
  const [search , setSearch] = useState("");
  const {setSelectedConversation} = useConversion()
  const {conversation} = useGetconversation()
  const handelSumbit =  (e)=>{
	e.preventDefault()
	if (!search) return;
	
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const con = conversation.find((c) => c.username.toLowerCase().includes(search.toLowerCase()));

		if (con) {
			setSelectedConversation(con);
			setSearch("");
		} else toast.error("No such user found!");

}
	return (
	<>
    <form onSubmit={handelSumbit} className='flex items-center gap-2  p-3 pt-5'>
	<input 	type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
 			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
 				<IoSearchSharp className='w-6 h-6 outline-none' />
 			</button>
 		</form>
			{/* <div className='divider my-0 py-0 w-[90%] h-1 mt-3' /> */}
	</>
  )
}

export default SearchInput