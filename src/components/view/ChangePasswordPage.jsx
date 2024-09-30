import { useState, useEffect } from "react"; // useEffect를 사용하여 컴포넌트 마운트 시 토큰 확인
import { useNavigate } from "react-router-dom"; // 사용자가 로그인하지 않은 경우 리다이렉트를 위해 사용
import axios from "axios"; // HTTP 요청 처리용 axios 임포트
import "./LoginJoinChangePWPage.css"; // 스타일 시트 임포트

// 비밀번호 변경 페이지 컴포넌트 정의
const ChangePasswordPage = () => {
  // 사용자 입력을 저장하는 상태 변수 정의
  const [email, setEmail] = useState(""); // 이메일 상태 변수
  const [password, setPassword] = useState(""); // 비밀번호 상태 변수
  const [passwordConfirm, setPasswordConfirm] = useState(""); // 비밀번호 확인 상태 변수
  const navigate = useNavigate(); // 리다이렉트를 위해 useNavigate 훅 사용

  // 컴포넌트가 마운트될 때 토큰 확인
  useEffect(() => {
    const token = localStorage.getItem("access_token"); // 로컬 스토리지에서 토큰 가져오기
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
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return; // 함수 종료
    }

    try {
      // 서버에 비밀번호 변경 요청
      const token = localStorage.getItem("access_token"); // 로컬 스토리지에서 토큰 가져오기
      const id = localStorage.getItem("id"); // 로컬 스토리지에서 사용자 ID 가져오기

      const res = await axios({
        method: "PATCH",
        url: `http://localhost:8080/user/password/${id}`, // 비밀번호 변경 API URL
        headers: {
          Authorization: `Bearer ${token}`, // 헤더에 토큰 추가
        },
        data: { email, password }, // 서버로 보낼 새로운 비밀번호 데이터
      });

      // 서버 응답이 성공적일 경우 처리
      if (res.status === 200) {
        alert("비밀번호 변경이 성공적으로 완료되었습니다.");
        navigate("/"); // 메인 페이지로 리다이렉트
      } else {
        alert("비밀번호 변경에 실패했습니다.");
      }
    } catch (err) {
      // 예외가 발생했을 경우 처리
      console.error("[change-password]", err); // 콘솔에 오류 메시지 출력
      alert("오류가 발생했습니다."); // 사용자에게 오류 메시지 표시
    }
  };

  return (
    <div className="container">
      {/* 비밀번호 변경 폼 */}
      <form onSubmit={handleSubmit}>
        <h1>비밀번호 변경</h1>

        {/* 이메일 입력 필드 */}
        <div className="input-field">
          <label>이메일</label>
          <input
            type="email" // 이메일 형식 유효성 검사를 위한 type
            placeholder="EMAIL" // 필드에 보일 안내 텍스트
            required // 필수 입력 필드로 지정
            value={email} // 상태 변수와 연결
            onChange={(e) => setEmail(e.target.value)} // 이메일 상태 업데이트
          />
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className="input-field">
          <label>비밀번호</label>
          <input
            type="password" // 비밀번호 입력 필드
            placeholder="PASSWORD" // 필드에 보일 안내 텍스트
            required // 필수 입력 필드로 지정
            value={password} // 상태 변수와 연결
            onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 업데이트
          />
        </div>

        {/* 비밀번호 확인 입력 필드 */}
        <div className="input-field">
          <label>비밀번호 확인</label>
          <input
            type="password" // 비밀번호 확인 입력 필드
            placeholder="PASSWORD CONFIRM" // 필드에 보일 안내 텍스트
            required // 필수 입력 필드로 지정
            value={passwordConfirm} // 상태 변수와 연결
            onChange={(e) => setPasswordConfirm(e.target.value)} // 비밀번호 확인 상태 업데이트
          />
        </div>

        {/* 비밀번호 변경 버튼 */}
        <button type="submit">Change Password</button>

        {/* 메인 페이지 링크 */}
        <div className="in-link">
          <p>
            다음에 변경하기 <a href="/">메인 페이지 가기</a> {/* 메인 페이지로 이동하는 링크 */}
          </p>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage; // ChangePasswordPage 컴포넌트를 기본 내보내기
