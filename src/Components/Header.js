import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaSignInAlt, FaUserAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../app/features/auth/authSlice'

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state)=>state.auth)

    const handleClick = () => {
        localStorage.removeItem('users')
        dispatch(logout())
        navigate('/login')
    }
  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>Goals</Link>
        </div>
        <ul>
            <li>
                <Link  to='/register'><FaUserAlt/>Register</Link>
            </li>
            {
                user ? (
                    <li>
                        <button onClick={handleClick} className='btn'>
                            <FaSignInAlt/>Logout
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link to='/login'><FaSignInAlt/>Login</Link>
                    </li>
                )
            }
        </ul>
    </header>
  )
}

export default Header