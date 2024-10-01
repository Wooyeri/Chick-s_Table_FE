import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeModal.css'; // 고유 이름을 사용한 CSS 추가
import xImage from '../assets/x.png';

const RecipeModal = ({ onClose, nickname }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);  // 기본값을 빈 배열로 설정
  const [error, setError] = useState(''); // 에러 상태 추가

  // 서버에서 레시피 목록 가져오기
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const userId = localStorage.getItem('username');
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`http://localhost:8080/scrap`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const { scraps } = response.data || [];  // 데이터가 없을 경우 빈 배열로 설정
        setSavedRecipes(scraps); // 스크랩 객체를 저장
        setError(''); // 에러가 없으면 에러 메시지를 빈 문자열로 설정
      } catch (err) {
        setError('레시피를 불러오는 도중 문제가 발생했습니다.'); // 에러 발생 시 메시지 설정
        setSavedRecipes([]); // 에러 발생 시 빈 배열로 설정
      }
    };

    fetchRecipes();
  }, []);

  // 스크랩 삭제 함수
  const handleDeleteClick = async (scrapId, recipeTitle) => {
    const isConfirmed = window.confirm(`"${recipeTitle}" 레시피를 삭제하시겠습니까?`);
    if (isConfirmed) {
      try {
        const token = localStorage.getItem('access_token');  // 토큰 이름 통일
        await axios.delete(`http://localhost:8080/scrap/${scrapId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // 삭제 성공 후 UI 업데이트
        const updatedRecipes = savedRecipes.filter(scrap => scrap.id !== scrapId);
        setSavedRecipes(updatedRecipes);
      } catch (error) {
        setError('레시피를 삭제하는 도중 문제가 발생했습니다.');
      }
    }
  };

  return (
    <div className="scrap-modal-overlay">
      <div className="scrap-modal-content">
        <button className="scrap-modal-close" onClick={onClose}>
          <img src={xImage} alt="x 아이콘" style={{ width: '15px', height: '15px' }} />
        </button>
        <h3>"{nickname}" 님의 저장한 레시피 목록</h3>
        
        {/* 에러가 있을 때만 에러 메시지를 표시 */}
        {error && (
          <p style={{ color: 'red', fontSize: '0.8rem' }}>{error}</p>
        )}

        <div className="scrap-recipe-list">
          {savedRecipes.length > 0 ? (
            savedRecipes.map((scrap, index) => (
              <div key={index} className="scrap-recipe-item">
                {scrap.title}
                <button className="scrap-delete-recipe" onClick={() => handleDeleteClick(scrap.id, scrap.title)}>
                  <img src={xImage} alt="x 아이콘" style={{ width: '10px', height: '10px' }} />
                </button>
              </div>
            ))
          ) : (
            !error && <p>저장된 레시피가 없습니다.</p>  // 데이터가 없을 경우 메시지 표시
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;
