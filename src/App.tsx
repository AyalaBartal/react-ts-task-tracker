import { useState, useEffect } from "react";
import ITask from "./interface/ITask"
import Header from "./component/Header"
import Tasks from "./component/Tasks"
import AddTask from "./component/AddTask";
 
function App() {

  const [tasks, setTasks] = useState<ITask[]>([])
  const [showAddBtn, setShowAddBtn] = useState(false)

  useEffect(() => {
    const getTasks = async (): Promise<any> => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async (): Promise<any> => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  const createTaskToSend = (task: ITask): string => {
    return JSON.stringify({text: task.text, day: task.day, reminder: task.reminder})
  }

  const fetchTask = async (id: number): Promise<any> => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  const addTask = async (task: ITask)=>{
    console.log('task is ',task)
    const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: createTaskToSend(task)
    })

    const data : ITask = await res.json()
    console.log('data is ', data)
    setTasks([
      ...tasks,
      data
    ])
  }

  const onDelete = async (id: number) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  const toggleRiminder = async (id: number) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: createTaskToSend(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  return (
    <div className='container'>
      <Header title={"Task Tracker"} onAdd= {() => setShowAddBtn(!showAddBtn)} showAdd={showAddBtn}></Header>
      {showAddBtn && <AddTask onAdd={addTask}/>}
      {
        tasks.length > 0 ?
        <Tasks 
          tasks={tasks}
          onDelete={onDelete}
          toggleReminder={toggleRiminder}
        /> 
        : 'No Task To Show'
      }
    </div>
  );
}

export default App;
