import React, { useState } from "react"
import ITask from "../interface/ITask"

interface Iprops {
    onAdd: (task: ITask) => void
}

const AddTask: React.FC<Iprops> = ({onAdd}) => {

    const [input, setInput] = useState({
        text: '',
        day: '',
        reminder: false
    }) 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
  }

  const onSubmitFunc = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.text === ''){
        alert('Please Add Text')
        return 
    }
    onAdd({
      id: Math.floor(Math.random() * 10000) + 1,
      text: input.text,
      day: input.day,
      reminder: input.reminder
    })
    setInput({
        text: '',
        day: '',
        reminder: false
    })

  }
  
  return (
    <form className='add-form' onSubmit={onSubmitFunc}>
      <div className='form-control'>
        <label>Task</label>
        <input
          type='text'
          placeholder='Add Task'
          value={input.text}
          name='text'
          onChange={handleChange}
        />
      </div>
      <div className='form-control'>
        <label>Day & Time</label>
        <input
          type='text'
          placeholder='Add Day & Time'
          value={input.day}
          onChange={(handleChange)}
          name='day'
        />
      </div>
      <div className='form-control form-control-check'>
        <label>Set Reminder</label>
        <input
          type='checkbox'
          checked={input.reminder}
          onChange={(e) => setInput({
              ...input,
              reminder: e.currentTarget.checked
          })}
          name='reminder'
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddTask
