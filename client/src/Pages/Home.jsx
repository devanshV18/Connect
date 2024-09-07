import React, {useEffect} from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { logout, setUser } from '../redux/userSlice'

const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
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
  return (
    <div>
      Home
    </div>
  )
}

export default Home
