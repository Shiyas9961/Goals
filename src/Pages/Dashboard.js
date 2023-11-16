import React, { useEffect, useState } from 'react'
import CreateGoal from '../Components/CreateGoal'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getGoal, reset } from '../app/features/goals/goalSlice'
import Spinner from '../Components/Spinner'
import ShowGoals from '../Components/ShowGoals'

function Dashboard() {
  const navigate = useNavigate()
  const {user} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const [edit,setEdit] = useState(false)

  const {isError,isLoading,goals,message} = useSelector((state)=>state.goal)

  useEffect(()=>{
    if(isError){
      console.log(message)
    }
    if(!user){
      navigate('/login')
    }
    dispatch(getGoal())
    return () => dispatch(reset())
  },[user,dispatch,navigate,message,isError])

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        {
          user ? <h1>Welcome {user.name}</h1> : <h1>Please sign</h1>
        }
      </section>
      <CreateGoal />
      <section className="content">
        {
          goals.length === 0 ? (
            <h1>No Goals Added</h1>
          ) : (
            goals.map(goal=>{
            return (
              <ShowGoals edit={edit} setEdit={setEdit} key={goal._id} goal={goal}/>
            )
            })
          )
        }
      </section>
    </>
  )
}

export default Dashboard