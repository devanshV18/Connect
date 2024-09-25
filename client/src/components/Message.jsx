import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { HiOutlineDotsVertical } from "react-icons/hi"
import { FaAngleLeft } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";

const Message = () => {
  const params = useParams()
  console.log("params", params?.userId)
  
  const socketConnection = useSelector(state => state.user.socketConnection)
  const user = useSelector(state => state?.user)
  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: ""
  })
  
  useEffect(() => {
    if(socketConnection){
      
      socketConnection.emit('message-page', params.userId)
      socketConnection.on('message-user', (data) => {
        setDataUser(data)
      })
    }
  }, [socketConnection, params?.userId, user])

  return (
    <div>
      <header className='sticky top-0 h-16 bg-white flex justify-between items-center px-8'>
        <div className='flex items-center gap-4'>
          <Link to={"/"} className='lg:hidden'>
            <FaAngleLeft size={25}/>
          </Link>
          <div className='mt-2 ml-2'>
            <Avatar
              width = {50}
              height = {50}
              imageUrl = {dataUser.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>

          <div>
            <h3 className='font-semibold text-lg my-0 text-ellipsis lime-clamp-1'>{dataUser?.name}</h3>
            <p className='-my-2'>
              {
                dataUser?.online ? <span className='text-violet-600 mt-2'>Online</span> : <span className='text-slate-500'>Offline</span>
              }
            </p>
          </div>
        </div>

        <div>
          <button className='cursor-pointer hover:text-violet-600'>
            <HiOutlineDotsVertical
            size={25}
            />
          </button>
        </div>
      </header>

       <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar'>
              Show all Messages
       </section>       

       <section className='h-16 bg-white'>
         <div className='flex justify-center items-center w-14 h-14 rounded-sm hover:bg-violet-400'>
              <button>
                <MdAttachFile 
                size={25}
                />
              </button>
         </div>
       </section>

    </div>
  )
}

export default Message
