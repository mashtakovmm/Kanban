import React from "react";
import "../css/Tasklist.css";

const TaskCard = ({ id, task, description }) => {
  return (
    <div className="task-item">
      {task}
    </div>
  );
};

export default TaskCard;
