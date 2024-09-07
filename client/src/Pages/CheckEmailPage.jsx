import React from 'react';
import { useState} from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import {Link} from "react-router-dom"
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const checkEmail = () => {

  const [data, setData] = useState({
    email: "",
   });

  const navigate = useNavigate()

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

    const URL = `http://localhost:4000/api/users/checkemail`

    try {
      const response = await axios.post(URL,data)
      console.log("response",response)

      toast.success(response.data.message)

      if(response?.data?.success){
        setData({
         email: "",
        })

        navigate('/check-password',{
          state: response?.data?.userExists
        })
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
                Enter your <span className='text-violet-600'>Email</span> to Get Started
              </h1>

              {/* <p className="mt-4 leading-relaxed text-gray-800 text-2xl font-bold text-center">
                Start <span className='text-violet-600'>Connecting</span>!
              </p> */}

              <div className='w-fit mx-auto mt-4'>
              <FaRegUserCircle
                size={40}
                className='mt-10'
              />
              </div>

              <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
                

                <div className="col-span-6">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder='Email'
                    className="px-4 py-3 mt-1 w-full border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    value={data.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    className="inline-block shrink-0 rounded-md border bg-white px-12 py-3 text-sm font-medium text-black transition hover:bg-violet-600 hover:text-white focus:outline-none focus:ring active:text-white"
                  >
                    Lets Go
                  </button>

                  <p className="mt-4 text-xl font-bold text-black sm:mt-0">
                    Dont Have an Account?
                    <Link to={"/register"} className='text-violet-600 hover:text-violet-800 hover:text-underline ml-2 text-decoration: underline'>Register</Link>
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

export default checkEmail;
