import React from 'react';
import './IntroPage.css';

const Intro = () => {
    return (
        <div className='intro-page'>
        <div className='text-container'>
            <div className='main-title'>
                당신의 <span className='bold'>식탁</span>
                <span className='line-break'></span>
                <span className='bold'>건강</span>하게 지켜보세요!
            </div>
            <div className='sub-title'>
                우리 <span className='bold-green'>병아리식탁</span>은 사용자와의 AI 상담을 통해
                <span className='line-break'></span>
                사용자 맞춤 식단 레시피를 제공합니다.
            </div>
            <button className="start-btn">시작하기</button>
        </div>
        </div>    
    );
};

export default Intro;
