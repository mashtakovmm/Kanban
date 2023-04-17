import React, { useState } from "react";
import "../css/Header.css"

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <header className="header">
            <div className="header-logo elem-to-hide">
                <span>Awesome Kanban Board</span> 
            </div>
            <div className="header-user-container" onClick={() => setShowMenu(!showMenu)}>
                <img src={'/user_pfp.png'} alt="User Icon" className="user-icon" />
                {showMenu ? <ArrowUp /> : <ArrowDown />}
                {showMenu && (
                    <div className="user-menu">
                        <button>Profile</button>
                        <button>Log out</button>
                    </div>
                )}
            </div>
        </header>
    );
};

const ArrowUp = () => {
    return <img src={'/arrow.png'} alt="" style={{ transform: 'rotate(180deg)' }} />
}

const ArrowDown = () => {
    return <img src={'/arrow.png'} alt="" />
}

export default Header;
