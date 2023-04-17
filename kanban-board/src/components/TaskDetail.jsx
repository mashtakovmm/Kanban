import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";
import "../css/TaskDetail.css";

const TaskDetail = () => {
  const location = useLocation();
  const { pathname } = location;
  const pathArray = pathname.split("/");
  const listid = pathArray[1];
  const taskId = pathArray[2];

  const currentListData = localStorage.getItem(listid)
  const currentData = JSON.parse(currentListData);
  const task = currentData.find(item => item.id == taskId);

  const [description, setDescription] = useState(task.description);

  const handleDescriptionChange = (event) => {
    setDescription(event.target.innerText);
    const newData = currentData.map(item => {
      if (item.id == taskId) {
        return {...item, description: event.target.innerText}
      }
      return item;
    });
    localStorage.setItem(listid, JSON.stringify(newData));
  }

  return (
    <>
        <Header />
        <div className="container">
            <div className="description-containter">
                <Link to={{ pathname: `/`}}><button className="close-button"><img src="/x.png" alt="" /></button></Link> 
                <h1 className="h1">{task.task}</h1>
                <p className="p" contentEditable onBlur={handleDescriptionChange}>{description}</p>
            </div>
        </div>
        <Footer />
    </>
  );
};

export default TaskDetail;
