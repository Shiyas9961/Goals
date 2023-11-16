import React, { useEffect, useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, reset } from '../app/features/auth/authSlice'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Components/Spinner'


function Login() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user,isLoading,isSuccess,isError,message } = useSelector((state)=>state.auth)

    useEffect(()=>{
        console.log(message)
        if(isError){
            toast.error(message)
        }
        if(isSuccess && user){
            navigate('/')
        }
        dispatch(reset())
    },[user,isError,isSuccess,message,dispatch,navigate])


    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
        dispatch(loginUser(userData))
    }
    if(isLoading){
        return <Spinner/>
    }
  return (
    <>
        <section className='heading'>
            <h1><FaSignInAlt/> Login</h1>
            <p>Login Existing User</p>
        </section>
        <section>
            <form onSubmit={(e)=>handleSubmit(e)}>  
                <div className="form-group">
                    <input type="email" name='email' placeholder='Enter your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="password" name='password' placeholder='Enter your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button  className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Login