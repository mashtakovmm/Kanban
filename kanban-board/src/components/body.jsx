import React, { useState, useEffect } from "react";
import "../css/Body.css";
import TaskList from "./tasklist";

const Body = () => {

  const [backlog, setBacklog] = useState([]);
  const [ready, setReady] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [finished, setFinished] = useState([]);
  
  // Загрузка данных из localStorage при первоначальной загрузке компонента
  useEffect(() => {
    const backlogData = JSON.parse(localStorage.getItem("backlog")) || [];
    const readyData = JSON.parse(localStorage.getItem("ready")) || [];
    const inProgressData = JSON.parse(localStorage.getItem("inProgress")) || [];
    const finishedData = JSON.parse(localStorage.getItem("finished")) || [];

    setBacklog(backlogData);
    setReady(readyData);
    setInProgress(inProgressData);
    setFinished(finishedData);
  }, []);

  // Обновление данных в localStorage при изменении состояния списков задач
  useEffect(() => {
    if (backlog.length > 0) {
      localStorage.setItem("backlog", JSON.stringify(backlog));
    }
    if (ready.length > 0) {
      localStorage.setItem("ready", JSON.stringify(ready));
    }
    if (inProgress.length > 0) {
      localStorage.setItem("inProgress", JSON.stringify(inProgress));
    }
    if (finished.length > 0) {
      localStorage.setItem("finished", JSON.stringify(finished));
    }
    
  }, [backlog, ready, inProgress, finished]);

  // const updateBacklog =(()=>{
  //   setBacklog(localStorage.getItem("backlog"))
  // })


  return (
    <div className="body">
      <TaskList
        listid="backlog"
        title="Backlog"
        tasks={backlog}
        onUpdateTasks={(newTasks) => setBacklog(newTasks)}
      />
      <TaskList
        listid="ready"
        title="Ready"
        tasks={ready}
        onUpdateTasks={(newTasks) => setReady(newTasks)}
        onUpdatePrevList={(newTasks) => setBacklog(newTasks)}
        prevList="backlog"
      />
      <TaskList
        listid="inProgress"
        title="In Progress"
        tasks={inProgress}
        onUpdateTasks={(newTasks) => setInProgress(newTasks)}
        onUpdatePrevList={(newTasks) => setReady(newTasks)}
        prevList="ready"
      />
      <TaskList
        listid="finished"
        title="Finished"
        tasks={finished}
        onUpdateTasks={(newTasks) => setFinished(newTasks)}
        onUpdatePrevList={(newTasks) => setInProgress(newTasks)}
        prevList="inProgress"
      />
    </div>
  );
};

export default Body;

