import React, {useState} from 'react'
import { IoChatbubbleEllipses} from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { TbLogout2 } from "react-icons/tb";
import Avatar from "./Avatar"
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';

const Sidebar = () => {
    const user = useSelector(state => state?.user)
    const [editUserOpen, setEditUserOpen] = useState(true);
  return (
    <div className='w-full h-full'>
        <div className='bg-slate-100 w-14 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
            <div>
                <NavLink title='chat' className={({isActive}) => `w-14 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive && "bg-slate-200"}`} >
                
                    <IoChatbubbleEllipses
                    size={28}
                    />  
                </NavLink>

                <div title='add friend' className='w-14 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded pl-2'>
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

        {
            editUserOpen && (
                <EditUserDetails onClose={() => setEditUserOpen(false)} user={user}/>
            )
        }
    </div>
  )
}

export default Sidebar
