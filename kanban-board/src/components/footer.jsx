import React, { useState } from "react";
import "../css/Header.css"

const Footer = () => {
    let activeTasks = localStorage.getItem("backlog") ? JSON.parse(localStorage.getItem("backlog")).length : 0;
    let finishedTasks = localStorage.getItem("finished") ? JSON.parse(localStorage.getItem("finished")).length : 0;    
    let userName = "<NAME>"
    let userDate = "<DATE>"
    return (
        <footer className="header footer">
            <div className="footer-element taks-counter elem-to-hide">
                <span>Active tasks:{activeTasks}</span>
                <span>Finished tasks:{finishedTasks}</span>
            </div>
            <div className="footer-element info-container elem-to-hide">
                <span>Kanban board by {userName}, {userDate}</span>
            </div>
        </footer>
    );
};

export default Footer;
