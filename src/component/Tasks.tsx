import ITask from "../interface/ITask"
import Task from "./Task"

interface IProps {
    tasks: ITask[]
    onDelete: (id: number) => void
    toggleReminder: (id: number) => void
}

const Tasks: React.FC<IProps> = ({tasks, onDelete, toggleReminder}) => {

    const renderTasks = (): JSX.Element[] => {
        return tasks.map((task) => <Task key={task.id} task={task} onDelete={onDelete} toggleReminder={toggleReminder}/>)
    }

    return (
      <>
         {renderTasks()}
      </>
    )
  }
  

export default Tasks
