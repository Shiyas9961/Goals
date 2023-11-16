import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addGoals } from '../app/features/goals/goalSlice'

function CreateGoal() {
    const [text,setText] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addGoals(text))
        setText('')
    }
  return (
    <section className='form'>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="goal">Goal</label>
                <input id='goal' type="text" name='goal' placeholder='Add your goals' value={text} onChange={(e)=>setText(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className='btn btn-block'>Add Goal</button>
            </div>
        </form>
    </section>
  )
}

export default CreateGoal