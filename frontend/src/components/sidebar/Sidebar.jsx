import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './Logout'

function Sidebar() {
  return  (
    <div className=' border-r-[0.1px] border-[#ffffff50] rounded-lg relative'>
        <SearchInput/>
        <div className='divider px-4 py-0 my-2'></div>
        <Conversations/>
        <LogoutButton/>
    </div>
  )
}

export default Sidebar