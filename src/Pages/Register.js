import React, { useState,useEffect } from 'react'
import { FaUserAlt } from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { registerUser, reset } from '../app/features/auth/authSlice'
import Spinner from '../Components/Spinner'

function Register() {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [password2,setPassword2] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isError,isLoading,user,isSuccess,message } = useSelector((state)=>state.auth)


    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess && user){
            navigate('/')
        }
        dispatch(reset())
    },[isError,dispatch,user,isSuccess,message,navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(password !== password2 ){
            toast.error('Password doesnot match')
        }else{
            const userData = {
                name,
                email,
                password
            }
            dispatch(registerUser(userData))
        }
    }
    if(isLoading){
        return <Spinner />
    }
  return (
    <>
        <section className='heading'>
            <h1><FaUserAlt/> Register</h1>
            <p>Register your Account</p>
        </section>
        <section>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="form-group">
                    <input type="text" name='name' placeholder='Enter your name' value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>    
                <div className="form-group">
                    <input type="email" name='email' placeholder='Enter your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="password" name='password' placeholder='Enter your Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="password" name='password2' placeholder='Confirm Password' value={password2} onChange={(e)=>setPassword2(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button className='btn btn-block'>Submit</button>
                </div>
            </form>
        </section>
    </>
  )
}

export default Register