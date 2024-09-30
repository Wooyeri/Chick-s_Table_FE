import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyPage from './mypage/MyPage'; 
import InformationEdit from './InformationEdit.jsx/InformationEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MyPage />} />  {/* 기본 마이페이지 경로 */}
        <Route path="/edit" element={<InformationEdit />} />  {/* 정보 수정 페이지 경로 */}
      </Routes>
    </Router>
  );
}

export default App;
