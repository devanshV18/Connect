import React, {useEffect, useState} from 'react'
import { IoChatbubbleEllipses} from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import Avatar from "./Avatar"
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
// import Divider from "./Divider"
import { IoArrowBack } from "react-icons/io5";
import SearchUser from './SearchUser';
import { FaImages } from "react-icons/fa";
import { RiFolderVideoFill } from "react-icons/ri";


const Sidebar = () => {
    const user = useSelector(state => state?.user)
    const [editUserOpen, setEditUserOpen] = useState(false);
    const [allUser, setAllUser] = useState([]);
    const [openSearchUser, setOpenSearchUser] = useState(false);
    const socketConnection = useSelector(state => state?.user?.socketConnection)

    useEffect(() => {
        if(socketConnection){
            socketConnection.emit('sidebar', user._id)

            socketConnection.on('conversation', (data) => {
                console.log('conversation', data)

                const conversationUserData = data.map((conversationUser,index) => {

                    if(conversationUser?.sender?._id === conversationUser?.receiver?._id){
                        return{
                            ...conversationUser,
                            userDetails : conversationUser?.sender
                        } 
                    }
                    else if(conversationUser?.receiver?._id !== user?._id){
                        return{
                            ...conversationUser,
                            userDetails : conversationUser?.receiver
                        }
                    }
                    else{
                        return{
                            ...conversationUser,
                            userDetails : conversationUser?.sender
                        }
                    }
                })
                setAllUser(conversationUserData)
            })
        }
    }, [socketConnection,user])

  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>
        <div className='bg-slate-100 w-14 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
            <div>
                <NavLink title='chat' className={({isActive}) => `w-14 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && "bg-slate-200"}`} >
                
                    <IoChatbubbleEllipses
                    size={28}
                    />  
                </NavLink>

                <div title='add friend' onClick={() => setOpenSearchUser(true)} className='w-14 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded pl-2'>
                    <FaUserPlus
                    size={28}
                    /> 
                </div>
            </div>

            <div className='flex flex-col items-center '>
                <button className='mb-2' title = {user?.name} onClick={() => setEditUserOpen(true)}>
                    <Avatar
                    width={40}
                    height={40}
                    name={user.name}
                    imageUrl={user?.profile_pic}
                    userId={user?._id}
                    />
                </button>
                <button title='logout' className='w-14 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded '>
                    <span className='pr-1'>
                        <TbLogout2
                        size={30}
                        height={30}
                        />
                    </span>
                </button>
            </div>
        </div>

        <div className='w-full'>
            <div className='h-16 flex items-center'>
                <h2 className='text-2xl font-bold p-4 text-slate-900'>Messages👋</h2>
            </div>
            <div className='bg-slate-200 p-[0.5px]'></div>

            <div className='h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar'>
                {
                    allUser.length === 0 && (
                        <div className='mt-5'>
                            <div className='flex justify-center items-center mb-2'>
                                <IoArrowBack 
                                size={40}
                                />
                            </div>
                            <p className='text-xl font-bold text-center'>Explore Users to Start a <span className='text-lg text-violet-600 font-bold'>Conversations!</span>
                            </p>

                        </div>
                    )
                }

                {
                    allUser.map((conv,index) => {
                        return(
                            <div key={conv?._id} className='flex items-center gap-2 py-3 px-2 border border-transparent hover:border-violet-300 rounded hover:bg-slate-200 cursor-pointer'>
                                <div>
                                    <Avatar
                                        imageUrl={conv?.userDetails?.profile_pic}
                                        name={conv?.userDetails?.name}
                                        width={40}
                                        height={40}
                                    />
                                </div>
                                <div>
                                    <h3 className='text-ellipsis line-clamp-1 font-semibold'>{conv?.userDetails?.name}</h3>
                                    <div className='text-slate-600 text-sm flex items-center gap-1'>
                                        <div className='flex items-center gap-1'>
                                            {
                                                conv?.lastMsg?.imageUrl && (
                                                    <div className='flex items-center gap-1'>
                                                        <span >
                                                         <FaImages/>
                                                        </span>
                                                       {!conv?.lastMsg?.text && <span>Image</span> } 
                                                    </div>
                                                 )
                                            }

                                            {
                                                conv?.lastMsg?.videoUrl && (
                                                    <div className='flex items-center gap-1'>
                                                        <span >
                                                         <RiFolderVideoFill/>
                                                        </span>
                                                       {!conv?.lastMsg?.text && <span>Video</span> } 
                                                        

                                                    </div>
                                                    
                                                )
                                            }
                                        </div>
                                        <p className='ml-2 text-md font-bold text-slate-800'>{conv.lastMsg.text}</p>
                                    </div>
                                </div>
                                <p className='text-sm w-8 h-8 flex justify-center items-center ml-auto p-1 bg-violet-200 text-black font-semibold rounded-full'>{conv?.unseenMsg}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>

        {
            editUserOpen && (
                <EditUserDetails onClose={() => setEditUserOpen(false)} user={user}/>
            )
        }

        {
            openSearchUser && (
                <SearchUser onClose={() => setOpenSearchUser(false)}/>
            )
        }
    </div>
  )
}

export default Sidebar
