import React, {useEffect} from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setUser } from '../redux/userSlice'
import Sidebar from '../components/Sidebar'
import logo from "../assets/logo.jpg"

const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  console.log("redux user",user)

  const fetchUserDetails = async() => {
    try {

    const URL = `http://localhost:4000/api/users/userdetails`
    const response = await axios({
      url: URL,
      withCredentials : true
    })

    console.log("Current User Details", response)

    dispatch(setUser(response?.data?.data))

    if(response.data.logout){
      dispatch(logout())
      navigate('/check-email')
    }
    } catch (error) {
      console.log("Error", error)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  },[])

  console.log("location", location)
  const basePath = location.pathname === '/'
  return (
   <div className='grid lg:grid-cols-[350px,1fr] h-screen max-h-screen bg-slate-200'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar/>
      </section>

      <section className={`${basePath && "hidden"}`}>
        <Outlet/>
      </section>

      <div className='lg:flex justify-center items-center flex-col gap-6 hidden'>
        <div>
          <img
            src={logo}
            width={100}
            alt='logo'
          />
        </div>
        <p className='font-bold text-2xl'>Pick Someone to start <span className='text-violet-600'>Connecting!</span></p>
      </div>
   </div>
  )
}

export default Home
