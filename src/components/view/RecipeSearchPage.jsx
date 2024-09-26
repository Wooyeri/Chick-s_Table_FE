import React, { useState, useEffect } from 'react';
import './RecipeSearchPage.css';
import SearchIcon from '../../assets/grey-search-icon.png';
import SearchImg from '../../assets/search-icon.png';

const API_KEY = '9b31d1ae298a4fa49c49'; // API Key

const RecipeSearchPage = () => {
  const [searchInput, setSearchInput] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(8); // 한 페이지에 보여줄 레시피 수

  // API 호출 함수
  const fetchRecipes = async () => {
    try {
      const response = await fetch(
        `http://openapi.foodsafetykorea.go.kr/api/${API_KEY}/COOKRCP01/xml/1/100/RCP_NM=${encodeURIComponent(searchInput)}`
      );
      const xmlData = await response.text(); // XML 데이터를 텍스트로 받아옴

      // XML 데이터를 파싱하는 함수
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlData, 'application/xml');

      // XML에서 필요한 데이터 추출
      const rows = xml.getElementsByTagName('row');
      const recipesData = Array.from(rows).map(row => ({
        RCP_SEQ: row.getElementsByTagName('RCP_SEQ')[0].textContent,
        RCP_NM: row.getElementsByTagName('RCP_NM')[0].textContent,
        RCP_PAT2: row.getElementsByTagName('RCP_PAT2')[0].textContent,
        ATT_FILE_NO_MAIN: row.getElementsByTagName('ATT_FILE_NO_MAIN')[0]?.textContent,
      }));

      setRecipes(recipesData);
      console.log("Recipes data:", recipesData); // API 호출 후 데이터 확인
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // 검색어 입력 감지 및 API 호출
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setCurrentPage(1); // 새로운 검색 시 첫 페이지로 리셋
      fetchRecipes(); // 엔터키를 누르면 API 호출
    }
  };

  // 현재 페이지에 해당하는 레시피 계산
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // 페이지 버튼 클릭 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 총 페이지 수 계산
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(recipes.length / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="recipe-search-page">
      {/* Search Section */}
      <div className="search-section">
        <div className='search-title'>
            병아리식탁은 <span className='bold-green'>20,000가지</span>의 레시피를 제공합니다. 
            <span className='line-break'></span>
            찾고 계시는 다양한 레시피를 이곳에서 검색해 보세요.
        </div>
        <div className="searchbar-container">
            <div className="searchbar">
              <img src={SearchIcon} alt="Search Icon" className="grey-search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="레시피 검색"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  console.log("Search term:", e.target.value); // 검색어 확인
                }}
                onKeyDown={handleKeyDown} // 엔터 키 입력 감지
              />
            </div>
        </div>
      </div>

      {/* Search Results Section */}
      <div className='search-result-section'>
        <div className='search-result-title'>검색 결과</div>
      </div>

      {/* Recipe Cards */}
      <div className="recipe-card-wrapper">
        <div className='recipe-card-container'>
          {currentRecipes.length > 0 ? (
            currentRecipes.map((recipe) => (
              <div key={recipe.RCP_SEQ} className="recipe-card">
                <div className="image-holder">
                  <img src={recipe.ATT_FILE_NO_MAIN || SearchImg} alt="Recipe Img" className="search-img" />
                </div>
                <div className="recipe-info">
                  <div className="recipe-name">{recipe.RCP_NM}</div>
                  <div className="recipe-category">분류 &gt; <span className='category-bold'>{recipe.RCP_PAT2}</span></div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">검색 결과가 없습니다.</div>
          )}
        </div>
      </div>

      {/* Pagination Section */}
      <div className="pagination">
        {pageNumbers.map(number => (
          <button key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipeSearchPage;
