import React from 'react';
import './HeaderComponent.css';
import ChickLoge from '../../assets/chick_text.png';
import SearchIcon from '../../assets/search-icon.png';
import ChatbotIcon from '../../assets/chatbot-icon.png';
import Dropdown from '../../assets/dropdown-icon.png';
import { Link } from "react-router-dom";


const HeaderComponent = () => {
  return (
    <header className="top-bar">
      <div className="logo">
        <Link to="/">
          <img src={ChickLoge} alt="Chick Logo" className="Chick-Logo" />
        </Link>
      </div>
      <nav className="header-bar">
        <ul className="header-list">
          <Link to="/recipesearch">
            <li className="header-item"><img src={SearchIcon} alt="Search Icon" className="search-icon" />레시피 검색</li>
          </Link>
          <div class="vertical-bar"></div>
          {/* <Link to="/chatbot"> */}
            <li className="header-item"><img src={ChatbotIcon} alt="Chatbot Icon" className="chatbot-icon" />챗봇과 대화</li>          
          {/* </Link> */}
          <div class="vertical-bar"></div>
          <li className="dropdown-container">
            <img src={Dropdown} alt="Dropdown" className="dropdown-icon" />
            {/* <div className={`dropdown-menu ${isDropdownVisible ? "show" : ""}`}>{renderDropdownMenu()}</div> */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;

