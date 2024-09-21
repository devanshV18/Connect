import React, {useEffect, useState} from 'react'
import Avatar from './Avatar';

const EditUserDetails = ({ onClose, user }) => {
    const [data, setData] = useState({
        name: user?.user,
        profile_pic: user?.profile_pic
    });
    useEffect(() => {
        setData((prev) => {
            return {
                ...prev,
                ...user    
            }
        })
    }, [user])
    
    const handleOnChange = (e) => {
        const {name , value} = e.target

        setData((prev) => {
            return{
                ...prev,
                [name] : value
            }
        })
    }

    const handleUploadPhoto = async(e) => {
        const file = e.target.files[0]

        const upload = await uploadFile(file)

        setUploadPhoto(file)

        setData((prev) => {
        return {
            ...prev,
            profile_pic: upload?.url
        }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        e.stopPropagation()
    }
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-gray-700 bg-opacity-40 flex justify-center items-center'>
        <div className='bg-white p-4 py-5 m-1 rounded-2xl w-full max-w-sm'>
            <h2 className='font-semibold'>Profile Details</h2> 
            <p className='text-sm'>Edit User Details</p>

            <form className='grid gap-3 mt-3' onSubmit = {handleSubmit}>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='name' className='font-bold'>Name :</label>
                    <input
                        className='pl-1 py-1 focus:outline-violet-500 border-0.5'
                        type='text'
                        name='name'
                        id='name'
                        value = {data?.name}
                        onChange={handleOnChange}
                    />
                </div>

                <div>
                    <label htmlFor="profile_pic" className='font-bold px-1'>Profile Picture</label>
                    <div className='my-1 flex items-center gap-4'>
                        <Avatar
                            width={150}
                            height={150}
                            imageUrl={data?.profile_pic}
                            name={data?.name}
                        />
                        <button className="inline-block shrink-0 rounded-md border bg-white px-12 py-3 text-sm  text-black transition hover:bg-violet-600 hover:text-white focus:outline-none focus:ring active:text-white font-semibold">
                            Edit Photo
                        </button>
                        <input
                            type='file'
                            className='hidden'
                            onChange={handleUploadPhoto}
                        />
                    </div>
                </div>

                <div className='flex ml-8 gap-2 mt-2'>
                    <button className="inline-block shrink-0 rounded-md border bg-white px-12 py-3 text-md font-medium text-black transition hover:bg-violet-600 hover:text-white focus:outline-none focus:ring active:text-white">
                        Cancel
                    </button>
                    <button className="inline-block shrink-0 rounded-md border bg-white px-12 py-3 text-md font-medium text-black transition hover:bg-violet-600 hover:text-white focus:outline-none focus:ring active:text-white">
                        Save
                    </button>
               </div>
            </form>
        </div>
    </div>
  )
}

export default React.memo(EditUserDetails)
