import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { HiOutlineDotsVertical } from "react-icons/hi"
import { FaAngleLeft } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { RiFolderVideoFill } from "react-icons/ri";


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

  const [openUpload, setOpenUpload] = useState(false)
  

  const handleUploadImage = async() => {
    
  }

  const handleUploadVideo = () => {

  }
  
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

       <section className='h-16 bg-white flex items-center'>
         <div className='relative'>
              <button className='flex justify-center items-center w-14 h-14 rounded-sm hover:bg-violet-400 p-4'
                  onClick = {() => setOpenUpload(!openUpload)}
              >
                <MdAttachFile 
                size={25}
                />
              </button>

              {
                openUpload && (
                  <div className='bg-white shadow rounded absolute bottom-16 w-36 p-2 ml-1'>
                  <form>
                    <label htmlFor='uplaodImage' className='flex items-center p-2 gap-3 hover:bg-slate-300 cursor-pointer'>
                      <div className='text-violet-500'>
                        <FaImages 
                        size={18}
                        />
                      </div>
                      <p>Images</p>
                    </label>
                    <label htmlFor="uploadVideo" className='flex items-center p-2 gap-3 hover:bg-slate-300 cursor-pointer'>
                      <div className='text-violet-500'>
                        <RiFolderVideoFill 
                        size={18}
                        />
                      </div>
                      <p>Videos</p>
                    </label>

                    <input
                      type='file'
                      id='uplaodImage'
                      onChange={handleUploadImage}
                    />

                    <input
                      type='file'
                      id='uploadVideo'
                      onChange={handleUploadVideo}
                    />
                  </form>
                </div>
                )
              }

              
         </div>
       </section>

    </div>
  )
}

export default Message
