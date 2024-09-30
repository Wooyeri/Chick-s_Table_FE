import React from 'react';
import './HeaderComponent.css';
import ChickLoge from '../../assets/chick_text.png';
import SearchIcon from '../../assets/search-icon.png';
import ChatbotIcon from '../../assets/chatbot-icon.png';
import Dropdown from '../../assets/dropdown-icon.png';
import { Link } from "react-router-dom";


const HeaderComponent = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false); // 드롭다운 상태 추가
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 여부 상태 추가

  // 토큰 확인하여 로그인 상태 설정
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정!
    } else {
      setIsLoggedIn(false); // 토큰이 없으면 비로그인 상태로 설정
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible); // 드롭다운 토글 함수
  };

  const closeDropdown = () => {
    setDropdownVisible(false); // 드롭다운 닫기 함수
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // 토큰 삭제
    setIsLoggedIn(false); // 로그아웃 상태로 변경
    closeDropdown(); // 드롭다운 닫기
  };

  // 로그인되지 않은 경우의 드롭다운 메뉴
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

  // 로그인된 경우의 드롭다운 메뉴
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

