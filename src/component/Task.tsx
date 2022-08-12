import ITask from "../interface/ITask"
import {FaTimes} from 'react-icons/fa'

interface IProps {
    task: ITask
    onDelete: (id: number) => void
    toggleReminder: (id: number) => void
}

const Task: React.FC<IProps> = ({task, onDelete, toggleReminder}) => {

  return (
    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick= {function(){toggleReminder(task.id)}} >
      <h3>
          {task.text}
          <FaTimes 
            style= { {color:'red', cursor:'pointer'}}
            onClick= {function(){onDelete(task.id)}}
         />
      </h3>
      <p>{task.day}</p>
    </div>

  )
}

export default Task


//