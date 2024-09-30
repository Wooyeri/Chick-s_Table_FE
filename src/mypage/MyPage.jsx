import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios로 API 호출
import { useNavigate } from 'react-router-dom'; 
import './MyPage.css'; 
import pencilIcon from '../assets/pencil-icon.png';
import RecipeModal from '../recipemodal/RecipeModal';
import listIcon from '../assets/list.png';

const MyPage = () => {
  const navigate = useNavigate(); 
  const [userData, setUserData] = useState({
    id: '',
    email: '',
    nickname: '',
    diseases: [],
    image: 'https://via.placeholder.com/120' // 기본 프로필 사진
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('username'); // username으로 변경, userId가 저장된 값을 가져옴
    const token = localStorage.getItem('access_token'); // token 대신 access_token으로 변경

    if (userId && token) {
      // API 호출을 통해 사용자 정보 가져오기
      axios.get(`http://localhost:8080/user/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}` // JWT 토큰을 헤더에 포함
        }
      })
      .then(response => {
        const user = response.data;
        // 사용자 데이터 설정
        setUserData({
          id: user.id,
          email: user.email,
          nickname: user.nickname,
          image: user.profilePath || 'https://via.placeholder.com/120', // profilePath로 설정
          diseases: user.diseases || [] // diseases 배열 처리
        });
      })
      .catch(error => {
        console.error('사용자 정보를 가져오는 데 실패했습니다.', error);
      });
    } else {
      console.error('유효한 userId 또는 토큰이 없습니다.');
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>
      <div className="profile-section">
        <img 
          src={userData.image}  
          alt="프로필" 
          className="profile-image"
        />
        <div className="profile-info">
          <p><strong>Id :</strong> {userData.id}</p>
          <p><strong>Email :</strong> {userData.email}</p>
          <p><strong>Nickname :</strong> {userData.nickname}</p>
          <p>
            <strong style={{ display: 'inline-block', verticalAlign: 'top' }}>Diseases :</strong>
            <span className="profile-disease-list">
              {userData.diseases.map((d, index) => (
                <span key={index} className="profile-disease-item">
                  {d.name} {d.contents && `(${d.contents})`} {/* details -> contents로 수정 */}
                </span>
              ))}
            </span>
          </p>
        </div>
        <button className="edit-button" onClick={() => navigate('/mypage/edit')}>
          <img src={pencilIcon} alt="Edit" style={{ width: '20px', height: '20px' }} />
        </button>
      </div>

      <button className="saved-chat-button" onClick={openModal}>
        저장한 레시피 목록 보러 가기 <img src={listIcon} alt="List Icon" style={{ width: '12px', height: '15px', verticalAlign: '-2px', marginLeft: '5px'}} />
      </button>

      {isModalOpen && <RecipeModal onClose={closeModal} nickname={userData.nickname} />}
    </div>
  );
};

export default MyPage;
