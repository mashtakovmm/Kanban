import React, {useState} from "react";
import TaskCard from "./taskcard";
import { Link } from "react-router-dom";
import "../css/Tasklist.css"

const TaskList = ({ listid, title, tasks, onUpdateTasks, onUpdatePrevList, prevList}) => {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [prevListTasks, setPrevListTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState('')

  const handleAddNewTask = (newTask) => {
    // Получаем текущие данные из localStorage для нужного listid
    const currentData = JSON.parse(localStorage.getItem(listid)) || [];
    const curentDate = new Date()
    const currentTime = curentDate.getTime()
    if(inputValue==="") return;
    newTask={key:currentTime, id:currentTime, task:inputValue, description:"Add description here..."}
    // Добавляем новую задачу в массив текущих данных
    currentData.push(newTask);
  
    // Сохраняем обновленные данные в localStorage для нужного listid
    localStorage.setItem(listid, JSON.stringify(currentData));
    setInputValue("")
    onUpdateTasks(currentData)
  };

  // Обработчик события изменения значения в инпуте
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  
  const handleDropDownInit = () => {
    setPrevListTasks(JSON.parse(localStorage.getItem(prevList)))
  }

  const handleTaskSelect = (e) => {
    setSelectedTask(e.target.value)
  }

  const handleSubmitButton = () => {
    const currentData = JSON.parse(localStorage.getItem(listid)) || [];
    if (!selectedTask || prevListTasks.length === 0) return;
    const handledTask = prevListTasks.find((element) => element.key == selectedTask)
    const newTask = {key:handledTask.key, id:handledTask.id, task:handledTask.task, description:handledTask.description}
    currentData.push(newTask);
    localStorage.setItem(listid, JSON.stringify(currentData));
    onUpdateTasks(currentData)  

    const currentPrevList = JSON.parse(localStorage.getItem(prevList)) || [];
    const newPrevList = currentPrevList.filter((element) => element.key !== handledTask.key);
    
    onUpdatePrevList(newPrevList)
    setSelectedTask(null)
  }

  return (
    <div className="task-list">
      <h2 className="column-title">{title}</h2>
      {tasks.map((task) => (
        <Link to={{ pathname: `/${listid}/${task.id}`}} style={{ color: 'inherit', textDecoration: 'none' }}><TaskCard key={task.id} id={task.id} task={task.task} /></Link>
      ))}
      {listid==="backlog" && (!isAddClicked ? (
        <button className="button add-task-button" onClick={()=>setIsAddClicked(!isAddClicked)}>
          <img src={"/add.png"}  alt="Add task"/>
          Add Card
        </button>
      ) : (
        <div>
          <input type="text" placeholder="Enter a title for this card..." value={inputValue} onChange={handleInputChange} className="input"/>
          <button className="button submit-button" onClick={()=>{handleAddNewTask(); setIsAddClicked(!isAddClicked)}} >Submit</button>
        </div>
      ))} 
      {listid!=="backlog" && (!isAddClicked ? (
        <button className="button add-task-button" onClick={()=>{handleDropDownInit(); setIsAddClicked(!isAddClicked)}}>
          <img src={"/add.png"} alt="Add task"/>
          Add Card
        </button>
      ) : (
        <div>
          <select value={selectedTask} onChange={handleTaskSelect} placeholder="Select task" className="select">
            {prevListTasks && prevListTasks.length > 0 ? (
              <>
                <option value="" disabled defaultValue={""} className="option">Select task</option>
                {prevListTasks.map((task) => (
                  <option value={task.id} key={task.id} className="option">
                    {task.task}
                  </option>
                ))}
              </>
                ) : (
                  <option value="" disabled defaultValue={""} className="option">No options available</option>
              )}
          </select>
          <button className="button submit-button" onClick={()=>{handleSubmitButton(); setIsAddClicked(!isAddClicked)}} >Submit</button>
        </div>
      ))} 
    </div>
  );
};

export default TaskList;
