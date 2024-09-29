import { useState } from "react"; // React의 useState 훅을 임포트
import "./LoginJoinChangePWPage.css"; // CSS 파일 임포트
import axios from "axios"; // Axios를 임포트하여 HTTP 요청 처리

const LoginPage = () => {
  // 사용자 입력을 저장하는 상태 변수 정의
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 양식이 제출될 때 호출되는 함수
  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼이 제출될 때 페이지가 새로고침 되는 것을 방지

    console.log("Login Information:", { username, password }); // 사용자 정보 출력 (디버깅 목적)

    try {
      // 서버에 로그인 요청
      const res = await axios({
        method: "POST",
        url: "http://localhost:8080/login", // 로그인 API URL
        data: { username, password }, // 서버로 보낼 사용자 정보
      });

      // 서버로부터의 응답이 성공적일 경우
      if (res.status === 200) {
        // JWT 토큰과 사용자 이름을 응답 헤더에서 가져옴
        const token = res.headers["token"];
        const returnedUsername = res.headers["username"];

        // 로컬 스토리지에 JWT 토큰과 사용자 이름 저장
        localStorage.setItem("access_token", token);
        localStorage.setItem("username", returnedUsername);

        console.log("로그인 성공"); // 성공 메시지 출력 (디버깅 목적)

        // 로그인 성공 알림 표시
        alert("로그인 성공!");
      } else {
        // 서버 응답이 200이 아닐 경우 실패 알림 표시
        alert("로그인에 실패했습니다.");
      }
    } catch (err) {
      // 예외가 발생했을 경우 오류 메시지 출력 및 알림 표시
      console.error("[login]", err);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="container">
      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <div className="input-field">
          {/* 사용자 ID 입력 필드 */}
          <input
            type="text"
            placeholder="ID" // 입력 필드에 보이는 텍스트
            required // 필수 입력 필드로 지정
            value={username} // 상태 변수와 바인딩
            onChange={(e) => setUsername(e.target.value)} // 입력 변경 시 상태 업데이트
          />
        </div>
        <div className="input-field">
          {/* 사용자 비밀번호 입력 필드 */}
          <input
            type="password"
            placeholder="PASSWORD" // 입력 필드에 보이는 텍스트
            required // 필수 입력 필드로 지정
            value={password} // 상태 변수와 바인딩
            onChange={(e) => setPassword(e.target.value)} // 입력 변경 시 상태 업데이트
          />
        </div>
        {/* 로그인 버튼 */}
        <button type="submit">Login</button>
        {/* 회원가입 링크 */}
        <div className="in-link">
          <p>
            회원이 아니십니까? <a href="/Join">회원가입하기</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage; // LoginPage 컴포넌트를 기본 내보내기
