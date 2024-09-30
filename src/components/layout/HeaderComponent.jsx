import React, { useState } from 'react'; 
import './HeaderComponent.css';
import ChickLoge from '../../assets/chick_text.png';
import SearchIcon from '../../assets/search-icon.png';
import ChatbotIcon from '../../assets/chatbot-icon.png';
import Dropdown from '../../assets/dropdown-icon.png';
import { Link } from "react-router-dom";

const HeaderComponent = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false); // 드롭다운 상태 추가

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible); // 드롭다운 토글 함수
  };

  const closeDropdown = () => {
    setDropdownVisible(false); // 드롭다운 닫기 함수
  };

  const renderDropdownMenu = () => {
    return (
      <ul className="dropdown-menu">
        <li className="dropdown-list">
          <Link to="/login" onClick={closeDropdown}>로그인</Link>
        </li>
        <li className="dropdown-list">
          <Link to="/join" onClick={closeDropdown}>회원가입</Link>
        </li>
      </ul>
    );
  };

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
            <li className="header-item">
              <img src={SearchIcon} alt="Search Icon" className="search-icon" />레시피 검색
            </li>
          </Link>
          <div className="vertical-bar"></div>
          <li className="header-item">
            <img src={ChatbotIcon} alt="Chatbot Icon" className="chatbot-icon" />나만의 영양사
          </li>
          <div className="vertical-bar"></div>
          <li className="dropdown-container" onClick={toggleDropdown}>
            <img src={Dropdown} alt="Dropdown" className="dropdown-icon" />
          </li>
        </ul>
      </nav>

      {isDropdownVisible && (
        <div className="dropdown-menu-container">
          {renderDropdownMenu()}
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
