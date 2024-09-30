import React, { useState, useEffect, useRef } from "react"; // useRef 추가
import './HeaderComponent.css';
import ChickLoge from '../../assets/chick_text.png';
import SearchIcon from '../../assets/search-icon.png';
import ChatbotIcon from '../../assets/chatbot-icon.png';
import Dropdown from '../../assets/dropdown-icon.png';
import { Link, useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // ref 생성

  // 컴포넌트가 마운트될 때와 localStorage 변경을 감지
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("access_token");
      setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
    };

    checkLoginStatus(); // 페이지가 열릴 때 토큰 확인

    // localStorage가 변경될 때마다 로그인 상태 갱신
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false); // 외부 클릭 시 드롭다운 닫기
      }
    };

    // 외부 클릭 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    closeDropdown();
    navigate("/");
  };

  const handleSearchClick = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 리다이렉트
    } else {
      navigate("/recipesearch"); // 로그인된 경우 레시피 검색 페이지로 이동
    }
  };

  const handleChatbotClick = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/login"); // 로그인 페이지로 리다이렉트
    } else {
      navigate("/chatbot"); // 로그인된 경우 챗봇 페이지로 이동
    }
  };

  const renderLoggedOutDropdownMenu = () => {
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

  const renderLoggedInDropdownMenu = () => {
    return (
      <ul className="dropdown-menu">
        <li className="dropdown-list">
          <Link to="/mypage" onClick={closeDropdown}>마이페이지</Link>
        </li>
        <li className="dropdown-list">
          <Link to="/saved-recipes" onClick={closeDropdown}>저장된 레시피</Link>
        </li>
        <li className="dropdown-list">
          <Link to="/change-password" onClick={closeDropdown}>비밀번호 변경</Link>
        </li>
        <li className="dropdown-list" onClick={handleLogout}>
          로그아웃
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
          <li className="header-item" onClick={handleSearchClick}>
            <img src={SearchIcon} alt="Search Icon" className="search-icon" />
            레시피 검색
          </li>
          <div className="vertical-bar"></div>
          <li className="header-item" onClick={handleChatbotClick}>
            <img src={ChatbotIcon} alt="Chatbot Icon" className="chatbot-icon" />
            나만의 영양사
          </li>
          <div className="vertical-bar"></div>
          <li className="dropdown-container" onClick={toggleDropdown}>
            <img src={Dropdown} alt="Dropdown" className="dropdown-icon" />
          </li>
        </ul>
      </nav>

      {isDropdownVisible && (
        <div className="dropdown-menu-container" ref={dropdownRef}> {/* ref 추가 */}
          {isLoggedIn ? renderLoggedInDropdownMenu() : renderLoggedOutDropdownMenu()}
        </div>
      )}
    </header>
  );
};

export default HeaderComponent;
