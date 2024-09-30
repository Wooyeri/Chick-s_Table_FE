import "./css/HeaderComponent.css";
import MainLogo from "../../assets/Mainlogo.png";
import Dropdown from "../../assets/Dropdown.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const HeaderComponent = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    }

    const handleClick = () => {
      setDropdownVisible(false);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const DropdownHandler = (e) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    setDropdownVisible((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    setDropdownVisible(false); // 로그아웃 시 드롭다운 메뉴를 닫음
    navigate("/"); // 로그아웃 시 메인 페이지로 리디렉션
    window.location.reload(); // 페이지를 새로고침하여 토큰 확인 로직 실행
  };

  const renderDropdownMenu = () => (
    <ul className="menu">
      {isLoggedIn ? (
        <>
          <li className="menu-item" onClick={handleLogout}>
            Logout
          </li>
          <li className="menu-line"></li>
          <Link to="/mypage">
            <li className="menu-item" onClick={() => setDropdownVisible(false)}>
              Mypage
            </li>
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">
            <li className="menu-item" onClick={() => setDropdownVisible(false)}>
              Login
            </li>
          </Link>
          <li className="menu-line"></li>
          <Link to="/join">
            <li className="menu-item" onClick={() => setDropdownVisible(false)}>
              Join
            </li>
          </Link>
        </>
      )}
    </ul>
  );

  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={MainLogo} alt="Logo" className="logo" />
        </Link>
      </div>
      <nav className="header-bar">
        <ul className="header-list">
          <Link to="/calendar">
            <li className="header-item">Calendar</li>
          </Link>
          <Link to="/dashboard">
            <li className="header-item">Leaderboard</li>
          </Link>
          <Link to="/statistics">
            <li className="header-item">Statistics</li>
          </Link>
          <li className="dropdown-container">
            <img src={Dropdown} alt="Dropdown" className="dropdown-icon" onClick={DropdownHandler} />
            <div className={`dropdown-menu ${isDropdownVisible ? "show" : ""}`}>{renderDropdownMenu()}</div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderComponent;

_______________________________---
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/common/HeaderComponent";
import Intro from "./components/Intro";
import Join from "./components/Join";
import CalendarPage from "./components/CalendarPage";
import Statistics from "./components/Statistics";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import MyPage from "./components/mypage";
import PWSearch from "./components/PWSearch";
import ChangePassword from "./components/ChangePassword";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* // http://localhost:3000 */}
          <Route path="/" element={<Intro />}></Route>

          {/* // http://localhost:3000/join */}
          <Route path="/join" element={<Join />}></Route>

          {/* // http://localhost:3000/login */}
          <Route path="/login" element={<Login />}></Route>

          {/* // http://localhost:3000/pwsearch */}
          <Route path="/pwsearch" element={<PWSearch />}></Route>

          {/* // http://localhost:3000/calendar */}
          <Route path="/calendar" element={<CalendarPage />}></Route>

          {/* // http://localhost:3000/dashboard */}
          <Route path="/dashboard" element={<Dashboard />}></Route>

          {/* // http://localhost:3000/statistics */}
          <Route path="/statistics" element={<Statistics />}></Route>

          {/* // http://localhost:3000/mypage */}
          <Route path="/mypage" element={<MyPage />}></Route>

          {/* // http://localhost:3000/change-password */}
          <Route path="/change-password" element={<ChangePassword />}></Route>

          {/* // http://localhost:3000/profile */}
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;