import React from 'react'
import Avatar from "./Avatar"
import { Link } from 'react-router-dom'

const UserSearchCard = ({user,onClose}) => {
  return (
    <Link to={"/"+user?._id} onClick={onClose} className='flex items-center gap-3 mt-4 lg:p-4 border border-transparent border-t-slate-200 hover:border hover:border-slate-400 rounded-md cursor-pointer '>
      <div>
        <Avatar
          width = {40}
          height = {40}
          name = {user?.name}
          imageUrl={user?.profile_pic}
          userId={user?._id}
        />
      </div>

      <div>
        <div className='font-semibold text-ellipsis line-clamp-1'>
            {user?.name}
        </div>
        <p className='text-sm'>{user?.email}</p>
      </div>
    </Link>
  )
}

export default UserSearchCard
