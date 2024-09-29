import { useState, useEffect } from "react"; // useEffect 추가하여 컴포넌트 마운트 시 토큰 확인
import { useNavigate } from "react-router-dom"; // 사용자가 로그인하지 않은 경우 리다이렉트를 위해 사용
import axios from "axios"; // HTTP 요청 처리용 axios 임포트
import "./LoginJoinChangePWPage.css";

const ChangePasswordPage = () => {
  // 사용자 입력을 저장하는 상태 변수 정의
  const [password, setPassword] = useState("");
  const [passwordconfirm, setPasswordconfirm] = useState("");
  const navigate = useNavigate(); // 리다이렉트를 위해 useNavigate 훅 사용

  // 컴포넌트가 마운트될 때 토큰 확인
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [navigate]);

  // 양식이 제출될 때 호출되는 함수
  const handleSubmit = async (event) => {
    event.preventDefault(); // 페이지 새로고침 방지

    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (password !== passwordconfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // 서버에 비밀번호 변경 요청
      const token = localStorage.getItem("access_token"); // 로컬 스토리지에서 토큰 가져오기

      const res = await axios({
        method: "POST",
        url: "http://localhost:8080/change-password", // 비밀번호 변경 API URL
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
        },
        data: { password }, // 서버로 보낼 새로운 비밀번호 데이터
      });

      if (res.status === 200) {
        alert("비밀번호 변경이 성공적으로 완료되었습니다.");
        navigate("/"); // 메인 페이지로 리다이렉트
      } else {
        alert("비밀번호 변경에 실패했습니다.");
      }
    } catch (err) {
      console.error("[change-password]", err);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>비밀번호 변경</h1>
        <div className="input-field">
          <input
            type="password"
            placeholder="PASSWORD"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            placeholder="PASSWORD CONFIRM"
            required
            value={passwordconfirm}
            onChange={(e) => setPasswordconfirm(e.target.value)} // 비밀번호 확인 상태 업데이트
          />
        </div>
        <button type="submit">Change Password</button>
        <div className="in-link">
          <p>
            다음에 변경하기 <a href="/">메인 페이지 가기</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
