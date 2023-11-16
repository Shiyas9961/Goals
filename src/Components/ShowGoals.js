import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoal, updateGoal } from '../app/features/goals/goalSlice'

function ShowGoals({goal}) {
  const dispatch = useDispatch()
  const [edit,setEdit] = useState(false)
  const [text,setText] = useState(goal.text)

const handleClick = (e) => {
  e.preventDefault()
  if(text=== '' || text === goal.text){
    setEdit(false)
    return
  }
  const goalData = {
    id : goal._id,
    text : text
  }
  dispatch(updateGoal(goalData))
  setEdit(false)
}
  return (
    <>
      {
        edit ? <div className='goal'>
          <form className='edit-form' onSubmit={handleClick}>
            <input className='edit-input' type="text" value={text} onChange={(e)=>setText(e.target.value)}/>
            <button className='edit-btn'>Edit</button>
          </form>
        </div> : (
          <div className='goal' >
          <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
          <h3>{goal.text}</h3>
          <button onClick={()=>dispatch(deleteGoal(goal._id))} className='close'>X</button>
          <button className='show-btn' onClick={()=>setEdit(true)}>Edit</button>
      </div>
        )
      }
    </>

  )
}

export default ShowGoals