import React ,{useState,useEffect} from 'react'
import { IoMdSearch } from "react-icons/io";
import Loading from './Loading';
import UserSearchCard from './UserSearchCard';
import toast from "react-hot-toast"
import axios from "axios"
import { IoCloseSharp } from "react-icons/io5";

const SearchUser = ({onClose}) => {
    const [searchUser, setSearchUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    const handleSearchUser = async() => {
        const URL = `http://localhost:4000/api/users/search-user`

        try {
            setLoading(true)
            const response = await axios.post(URL,{
                search : search
            })
            setLoading(false)
            setSearchUser(response.data.data)

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }

    //every time input field changes (upon typing) the state var search changes and we use it as a changing dependency toacall tha api and use setSearchUser fxn to store the array of reponse in the  searchUser state Array, The api is defined in such a way that it returns array response
    useEffect(() => {
        handleSearchUser()
    }, [search])

    console.log("SearchUser", searchUser)

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700 bg-opacity-40 p-2'>
        <div className='w-full max-w-lg mx-auto mt-10'>
        
        <div className='bg-white h-14 overflow-hidden flex rounded-md'>
            <input 
                type='text'
                placeholder='Search user by Name or Email'
                className='w-full outline-none py-1 h-full px-4 '
                onChange={(e) => setSearch(e.target.value)}
                value={search}
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
                                <UserSearchCard key={user._id} user={user} onClose={onClose}/>
                            )
                        })
                )
            }

        </div>
    </div>
    <div className='absolute top-0 right-0 text-2xl p-12 lg:text-4xl hover:text-white' 
        onClick={onClose}
    >
        <button>
            <IoCloseSharp 
          
            />
        </button>
    </div>
</div>
  )
}

export default SearchUser
