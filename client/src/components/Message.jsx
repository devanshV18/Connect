import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from './Avatar'
import { HiOutlineDotsVertical } from "react-icons/hi"
import { FaAngleLeft } from "react-icons/fa";
import { MdAttachFile } from "react-icons/md";
import { FaImages } from "react-icons/fa";
import { RiFolderVideoFill } from "react-icons/ri";
import uploadFile from '../helpers/uploadFile'
import { RxCross2 } from "react-icons/rx";
import Loading from './Loading'
import backgroundImage from '../assets/wallpaper.jpeg'
import { IoIosSend } from "react-icons/io";
import moment from "moment"




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
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  })
  
  const [loading,setLoading] = useState(false)
  const [allMessage, setAllMessage] = useState([])
  const currentMessage = useRef()

  useEffect(() => {
    if(currentMessage.current){
      currentMessage.current.scrollIntoView({behavior : 'smooth', block : 'end'})
    }
  }, [allMessage])

  const handleUploadImage = async(e) => {
    const file = e.target.files[0]
    setLoading(true)
    const uploadImage = await uploadFile(file)
    setLoading(false)
    setOpenUpload(false)
    setMessage(prev => {
      return{
        ...prev,
        imageUrl: uploadImage?.url
      }
    })
  }

  const handleClearImage = () => {
    setMessage(prev => {
      return{
        ...prev,
        imageUrl: ""
      }
    })
  }

  const handleUploadVideo = async(e) => {
    const file = e.target.files[0]
    setLoading(true)
    const uploadVideo = await uploadFile(file)
    setLoading(false)
    setOpenUpload(false)

    setMessage(prev => {
      return{
        ...prev,
        videoUrl: uploadVideo?.url
      }
    })
  }

  const handleClearVideo = () => {
    setMessage(prev => {
      return{
        ...prev,
        videoUrl: ""
      }
    })
  }
  
  useEffect(() => {
    if(socketConnection){
      
      socketConnection.emit('message-page', params.userId)
      socketConnection.on('message-user', (data) => {
        setDataUser(data)
      })
      socketConnection.on('message', (data) => {
        console.log('message data',data)
        setAllMessage(data)
      })
    }
  }, [socketConnection, params?.userId, user])

  const handleOnChangeText = (e) => {
    const {name,value} = e.target
    setMessage(prev => {
      return{
        ...prev,
        text: value
      }
    })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if(message.text || message.imageUrl || message.videoUrl){
      if(socketConnection){
        socketConnection.emit('new message', {
          sender: user?._id,
          receiver: params.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
          msgByUserId : user?._id
        })

        setMessage(
          {
            text: "",
            imageUrl: "",
            videoUrl: ""
          }
        )
      }
    }

  }

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`}} className='bg-no-repeat bg-cover'>
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

       <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200 bg-opacity-50'>
              <div className='flex flex-col gap-2 py-2 mx-2'>
                {
                  allMessage.map((msg,index) => {
                    return (
                      <div ref={currentMessage} className={`bg-white-200 px-4 m-4 py-1 rounded w-fit max-w-[230px] md:max-w-sm lg:max-w-md ${user._id === msg.msgByUserId ? "ml-auto bg-violet-200" : ""}`}>

                        <div className='w-full'>
                          {
                            msg?.imageUrl && (
                              <img
                                src={msg?.imageUrl}
                                className='w-full h-full object-scala-down'
                              />
                            )
                          }
                        
                          {
                            msg?.videoUrl && (
                              <video
                                src={msg?.videoUrl}
                                className='w-full h-full object-scala-down'
                                controls
                              />
                            )
                          }
                        </div>


                        <p className='px-2 text-2xl'>{msg.text}</p>
                        <p className='text-sm m-auto w-fit'>
                          {moment(msg.createdAt).format('hh:mm')}
                        </p>
                      </div>
                    )
                  })
                }
              </div>

              {
                message.imageUrl && (
                    <div className='w-full h-full sticky bottom-0 bg-violet-300 bg-opacity-20 flex justify-center items-center rounded   overflow-hidden'>
                      <div className='w-fit p-20 absolute top-0 right-0 cursor-pointer hover:text-violet-500'
                        onClick={handleClearImage}
                      >
                        <RxCross2 
                          size={50}
                        />
                      </div>
                      <div className='bg-white p-3'>
                        <img
                          src={message?.imageUrl}
                          width={300}
                          height={300}
                          className='object-scale-down'
                          alt='Uploaded Image'
                        />
                      </div>
                    </div> 
                  )
              }

              {
                message.videoUrl && (
                    <div className='w-full h-full sticky bottom-0 bg-violet-300 bg-opacity-20 flex justify-center items-center rounded   overflow-hidden'>
                      <div className='w-fit p-20 absolute top-0 right-0 cursor-pointer hover:text-violet-500'
                        onClick={handleClearVideo}
                      >
                        <RxCross2 
                          size={50}
                        />
                      </div>
                      <div className='bg-white p-3'>
                        <div>
                          <video
                            src={message?.videoUrl}
                            className='aspect-video w-full h-full max-w-sm object-scale-down'
                            controls
                            muted
                            autoPlay  
                          />
                        </div>
                      </div>
                    </div> 
                  )
              }

              {
                loading && (
                  <div className='w-full h-full flex sticky bottom-0 justify-center items-center'>
                    <Loading/>
                  </div>  
                )
              }

       </section>       

      <section className='h-16 bg-white flex items-center'>
          <div className='relative'>
              <button className='flex justify-center items-center w-14 h-14 rounded-sm hover:bg-violet-300 p-4'
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
                      className='hidden'
                    />

                    <input
                      type='file'
                      id='uploadVideo'
                      onChange={handleUploadVideo}
                      className='hidden'
                    />
                  </form>
                  </div>
                )
              }

          </div>

          <form className='h-full w-full flex gap-2' onSubmit={handleSendMessage}>
              <input
                type='text'
                placeholder='Type a message...'
                className='py-1 px-4 outline-none w-full h-full'
                value={message.text}
                onChange={handleOnChangeText}
              />
              <button className='hover:text-violet-600 mr-20'>
                <IoIosSend 
                  size={38}
                />
              </button>
          </form>
          
      </section>
    </div>
  )
}

export default Message
