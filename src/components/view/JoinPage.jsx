import { useState } from "react"; // React에서 useState 훅을 사용하기 위해 임포트
import "./LoginJoinChangePWPage.css"; // 스타일 시트를 임포트
import axios from "axios";

const JoinPage = () => {
  // 사용자 입력을 저장하는 상태 변수 정의
  const [formData, setFormData] = useState({
    id: "",
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  // 입력 값이 변경될 때 상태를 업데이트하는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target; // 입력 필드의 name과 value를 가져옴
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // 입력 필드의 이름을 키로 사용하여 상태 업데이트
    }));
  };

  // 양식이 제출될 때 호출되는 함수
const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지가 새로고침 되는 것을 방지

    // { id: formData.id, nickname: formData.nickname, email: formData.email, password: formData.password, passwordConfirm: formData.passwordConfirm }

    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    } else {
      await axios({
        method: "POST",
        url: "http://localhost:8080/join", // 로그인 API URL
        data: { id: formData.id, nickname: formData.nickname, email: formData.email, password: formData.password, passwordConfirm: formData.passwordConfirm }, // 서버로 보낼 사용자 정보
      })
      .then(res => {
        if (res.status === 201) {
					if (res.status === 201) {
            console.log("회원가입 성공")
            console.log(res.data)
          }
				} else {
          console.log("회원가입 실패")
				}
      })
      .catch(err => {
        console.log("에러 발생");
        console.log("HTTP Status: " + err.status)
        console.log("Error Message: " + err.response.data)
      })
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        
        {/* ID 입력 필드 */}
        <div className="input-field">
          <input
            type="text"
            name="id" // 상태 업데이트 시 사용할 name 속성
            placeholder="ID"
            required
            value={formData.id}
            onChange={handleInputChange}
          />
        </div>

        {/* 닉네임 입력 필드 */}
        <div className="input-field">
          <input
            type="text"
            name="nickname"
            placeholder="NICKNAME"
            required
            value={formData.nickname}
            onChange={handleInputChange}
          />
        </div>

        {/* 이메일 입력 필드 */}
        <div className="input-field">
          <input
            type="email" // 이메일 형식 유효성 검사를 위한 type
            name="email"
            placeholder="EMAIL ADDRESS"
            required
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className="input-field">
          <input
            type="password"
            name="password"
            placeholder="PASSWORD"
            required
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {/* 비밀번호 확인 입력 필드 */}
        <div className="input-field">
          <input
            type="password"
            name="passwordConfirm"
            placeholder="PASSWORD CONFIRM"
            required
            value={formData.passwordConfirm}
            onChange={handleInputChange}
          />
        </div>

        {/* 회원가입 버튼 */}
        <button type="submit">SIGN UP</button>

        {/* 로그인 링크 */}
        <div className="in-link">
          <p>
            기존 회원 <a href="/login">로그인하기</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default JoinPage; // JoinPage 컴포넌트를 기본 내보내기
