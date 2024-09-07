import React from 'react';
import { useState} from 'react';
import {IoClose} from "react-icons/io5"
import {Link} from "react-router-dom"
import uploadFile from '../helpers/uploadFile';
import toast from 'react-hot-toast';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  });

  const navigate = useNavigate()

  const [uploadPhoto, setUploadPhoto] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target

    setData((prev) => {
      return{
        ...prev, [name]: value
      }
    })
  }

  const handleUpload = async(e) => {

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


  const handleClearUpload = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = `http://localhost:4000/api/users/register`

    try {
      const response = await axios.post(URL,data)
      console.log("response",response)

      toast.success(response.data.message)

      if(response.status === 201){
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: ""
        })

        navigate('/check-email')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }

    console.log("data", data)
  }

  


  return (
    <>
     <section className="bg-white flex justify-center items-center min-h-screen">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <main
            className="flex items-center justify-center w-full px-8 py-8 sm:px-12 lg:px-16 lg:py-12 xl:col-span-12"
          >
            <div className="max-w-xl lg:max-w-3xl w-full">
              <h1 className="mt-0 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl text-center">
                Welcome to <span className='text-violet-600'>Connect</span> 👋🏼
              </h1>

              <p className="mt-4 leading-relaxed text-gray-800 text-2xl font-bold text-center">
                Stay Online!
              </p>

              <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={handleSubmit}>
                <div className="col-span-6 sm:col-span-3">
                  <input
                    type="text"
                    id="name"
                    placeholder='Name'
                    name="name"
                    className="px-4 py-3 mt-1 border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    value={data.name}
                    onChange={handleChange}
                    required
                  />
                </div>

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

                <div className="col-span-6 sm:col-span-3">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder='Password'
                    className="px-4 py-3 mt-1 w-full border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Photo upload div */}
                <div className="col-span-6">
                  
                  <label htmlFor="profile_pic" 
                  className="block text-sm font-medium text-gray-700"> 
                    
                    <div className='h-14 bg-slate-200 flex justify-center items-center border hover:border-black cursor-pointer'>
                      <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                        {
                          uploadPhoto?.name ? uploadPhoto?.name : "Upload a Profile picture"
                        }
                      </p>
                        {
                          uploadPhoto?.name && (
                            <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUpload}>
                              <IoClose/> 
                            </button>
                          )
                        }
                    </div>

                  </label>

                  <input
                    type="file"
                    id="profile_pic"
                    name="profile_pic"
                    className="bg-slate-200 px-2 py-1 focus:outline-primary hidden"
                    onChange={handleUpload}
                  />

                </div>


                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button
                    className="inline-block shrink-0 rounded-md border border-none bg-white px-12 py-3 text-sm font-medium text-black transition hover:bg-violet-600 hover:text-white focus:outline-none focus:ring active:text-white"
                  >
                    Create an account
                  </button>

                  <p className="mt-4 text-xl font-bold text-black sm:mt-0">
                    Already have an account? 
                    <Link to={"/check-email"} className='text-violet-600 hover:text-violet-800 hover:text-underline ml-2 text-decoration: underline'>Log In</Link>
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

export default RegisterPage;
