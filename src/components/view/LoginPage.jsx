import { useState } from "react"; // React의 useState 훅을 임포트
import "./LoginJoinChangePWPage.css"; // CSS 파일을 임포트하여 스타일 적용
import axios from "axios"; // Axios를 임포트하여 HTTP 요청 처리

// LoginPage 컴포넌트 정의
const LoginPage = () => {
  // 사용자 아이디와 비밀번호 입력을 저장하는 상태 변수
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 로그인 폼이 제출될 때 호출되는 함수
  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    // console.log("Login Information:", { username, password }); // 입력한 사용자 정보를 콘솔에 출력 (디버깅용)

    // 폼 데이터를 서버에 전송하기 위해 FormData 객체 생성
    const formData = new FormData();
    formData.append('username', username); // 사용자 아이디 추가
    formData.append('password', password); // 사용자 비밀번호 추가

    try {
      // 서버로 로그인 요청 전송
      const res = await axios({
        method: "POST",
        url: "http://localhost:8080/login", // 로그인 API의 URL
        data: formData, // 폼 데이터 전송
      });

      // 응답 상태가 성공(200)일 경우 처리
      if (res.status === 200) {
        // 서버로부터 JWT 토큰과 사용자 이름을 응답 헤더에서 가져옴
        const token = res.headers["token"];
        const returnedUsername = res.headers["id"];

        // 로컬 스토리지에 JWT 토큰과 사용자 이름을 저장
        localStorage.setItem("access_token", token);
        localStorage.setItem("username", returnedUsername);

        alert("로그인 성공!"); // 사용자에게 성공 메시지 표시
        navigate("/"); // 메인 페이지로 리다이렉트
      } else {
        // 응답이 성공이 아닐 경우
        alert("로그인에 실패하였습니다."); // 사용자에게 실패 메시지 표시
      }
    } catch (err) {
      // 로그인 요청 중 예외 발생 시 처리
      console.error("[login]", err); // 오류 메시지를 콘솔에 출력
      alert(err.response.data); // 사용자에게 오류 메시지 표시
    }
  };

  return (
    <div className="container">
      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <div className="input-field">
          <label>아이디</label>
          {/* 사용자 아이디 입력 필드 */}
          <input
            type="text"
            placeholder="아이디" // 필드에 표시될 안내 텍스트
            required // 필수 입력 필드로 지정
            value={username} // 상태 변수와 바인딩
            onChange={(e) => setUsername(e.target.value)} // 입력이 변경될 때 상태 업데이트
          />
        </div>
        <div className="input-field">
          <label>비밀번호</label>
          {/* 사용자 비밀번호 입력 필드 */}
          <input
            type="password"
            placeholder="비밀번호" // 필드에 표시될 안내 텍스트
            required // 필수 입력 필드로 지정
            value={password} // 상태 변수와 바인딩
            onChange={(e) => setPassword(e.target.value)} // 입력이 변경될 때 상태 업데이트
          />
        </div>
        {/* 로그인 버튼 */}
        <button type="submit">로그인</button>
        {/* 회원가입 페이지 링크 */}
        <div className="in-link">
          <p>
            회원이 아니십니까? <a href="/Join">회원가입하기</a> {/* 회원가입 링크 */}
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage; // LoginPage 컴포넌트를 기본 내보내기
