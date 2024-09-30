import { useState } from "react";
import "./LoginJoinChangePWPage.css";
import axios from "axios";
import { connect } from "react-router-dom"; // 로그인 성공의 경우 리다이렉트를 위해 사용


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = connect(); // 리다이렉트를 위해 connect 훅 사용

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    // x-www-form-urlencoded 형식으로 데이터를 서버에 전송하기 위해 URLSearchParams 객체 생성
    const params = new URLSearchParams();
    params.append('username', username); // 사용자 아이디 추가
    params.append('password', password); // 사용자 비밀번호 추가

    try {
      // 서버로 로그인 요청 전송
      const res = await axios({
        method: "POST",
        url: "http://localhost:8080/login", 
        data: params, // x-www-form-urlencoded 방식으로 전송
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // 반드시 헤더에 Content-Type 설정
        }
      });

      // 응답 상태가 성공(200)일 경우 처리
      if (res.status === 200) {
        const token = res.headers["token"];
        const returnedUsername = res.headers["id"];

        // 로컬 스토리지에 JWT 토큰과 사용자 이름을 저장
        localStorage.setItem("access_token", token);
        localStorage.setItem("username", returnedUsername);

        alert("로그인 성공!"); // 사용자에게 성공 메시지 표시
        
        navigate("/"); // 메인 페이지로 리다이렉트

      } else {

        alert("로그인에 실패하였습니다."); 
        
      }
    } catch (err) {
      console.error("[login]", err); 
      alert(err.response.data); 
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>로그인</h1>
        <div className="input-field">
          <label>아이디</label>
          <input
            type="text"
            placeholder="아이디"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label>비밀번호</label>
          <input
            type="password"
            placeholder="비밀번호"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
        <div className="in-link">
          <p>
            회원이 아니십니까? <a href="/Join">회원가입하기</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;