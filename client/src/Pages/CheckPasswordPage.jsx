import React, { useEffect } from 'react';
import { useState} from 'react';
import {Link, useLocation} from "react-router-dom"
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import {useDispatch} from "react-redux"
import { setToken } from '../redux/userSlice';


const checkPasswordPage = () => {

  const [data, setData] = useState({
    password: ""
   });

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  console.log("location",location)


  console.log(location.state)

  useEffect(() => {
    if(!location?.state?.name){
      navigate('/check-email')
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return{
        ...prev, [name]: value
      }
    })
  }

  
  const handleSubmit = async(e) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = `http://localhost:4000/api/users/checkpassword`

    try {
      const response = await axios({
        method: 'post',
        url: URL,
        data: {
          userId : location?.state?._id,
          password  : data.password
        },
        withCredentials : true
      })

      toast.success(response.data.message)
      
    

      if(response.data.success){

        dispatch(setToken(response?.data?.token))
        localStorage.setItem('token', response?.data?.token)
        setData({
          password: ""
        })
        navigate('/')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  return (
    <>
     <section className="bg-white flex justify-center items-center min-h-screen">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <main
            className="flex items-center justify-center w-full px-8 py-8 sm:px-12 lg:px-16 lg:py-12 xl:col-span-12"
          >
            <div className="max-w-xl lg:max-w-3xl w-full">
              <h1 className="mt-0 text-2xl font-bold text-gray-900 sm:text-3xl ml-10 md:text-4xl text-center">
                Enter your <span className='text-violet-600'>Password</span> &
              </h1>

              <p className="mt-4 leading-relaxed text-gray-800 text-3xl font-bold text-center">
                Start <span className='text-violet-600'>Connecting</span>!
              </p>

              <div className='w-fit mx-auto mt-4  flex items-center justify-center'>
                {/* <FaRegUserCircle
                  size={50}
                /> */}
                <Avatar
                  width={50}
                  name={location.state?.name}
                  imageUrl={location.state?.profile_pic}
                  height={50}
                />
                <h2 className='font-bold text-xl ml-5'>{location.state?.name}</h2>
              </div>

              <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
                

                <div className="col-span-6">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Enter your Password'
                    className="px-4 py-3 mt-1 w-full border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">

                  <button
                    className="inline-block shrink-0 rounded-md border bg-white px-12 py-3 text-sm font-medium text-black transition hover:bg-violet-600 hover:text-white focus:outline-none focus:ring active:text-white"
                  >
                    Connect!
                  </button>

                  <p className="mt-4 text-xl font-bold text-black sm:mt-0">
                    Need Help? 
                    <Link to={"/forgot-password"} className='text-violet-600 hover:text-violet-800 hover:text-underline ml-4 text-decoration: underline'>Forgot Password</Link>
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>                
    </>
  );
};

export default checkPasswordPage;
