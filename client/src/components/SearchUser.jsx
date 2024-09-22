import React ,{useState} from 'react'
import { IoMdSearch } from "react-icons/io";
import Loading from './Loading';
import UserSearchCard from './UserSearchCard';

const SearchUser = () => {
    const [searchUser, setSearchUser] = useState([]);
    const [loading, setLoading] = useState(true);
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2'>
        <div className='w-full max-w-lg mx-auto mt-10'>
        
        <div className='bg-white h-14 overflow-hidden flex rounded-md'>
            <input 
                type='text'
                placeholder='Search user by Name or Email'
                className='w-full outline-none py-1 h-full px-4 '
            />
            <div className='h-14 w-14 flex justify-center items-center text-violet-700'>
                <IoMdSearch 
                    size={35}
                />
            </div>
        </div>

        <div className='bg-white mt-2 w-full p-4 rounded'>
            {
                searchUser.length === 0 && !loading && (
                    <p className='font-bold text-lg text-center'><span className='text-violet-600'>Oops, </span>It seems that the user doesn't <span className='text-violet-600'>exists.</span>😅</p>
                )
            }
            {
                loading && (
                    <div className='flex justify-center items-center gap-5'>
                        <p className='text-xl font font-semibold'>
                            Looking for <span className='text-violet-600 font-bold'>Results!</span>
                        </p>
                        <div><Loading/></div>
                     </div>
                )
            }

            {
                searchUser.length !== 0 && !loading && (
                        searchUser.map((user,index) => {
                            return(
                                <UserSearchCard key={user._id} user={user}/>
                            )
                        })
                )
            }

        </div>

      </div>
    </div>
  )
}

export default SearchUser
