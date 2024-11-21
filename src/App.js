import React, { useState } from 'react';
import './App.css';
import Header from './components/01-Header/CoverImage'; // CoverImage 컴포넌트 불러오기
import MainContent from './components/02-MainContent/MainContent';  // MainContent 폴더 안의 섹션들
import Footer from './components/03-Footer/BottomImage';  // Footer 컴포넌트 불러오기
import Modal from './components/04-Modal/AttendanceStatus'; // Modal 관련 컴포넌트 불러오기
import MusicPlay from './components/05-MusicPlay/MusicPlayer'; // MusicPlayer 컴포넌트 불러오기
import GifIntro from './components/06-GifIntro/GifIntro'; // GifIntro 컴포넌트 불러오기


function App() {
  return (
    <div className="App">
      <div className="content">
        <Modal /> {/* 모달 섹션 */}
        <MusicPlay /> {/* 음악 플레이어 섹션 */}
        <Header /> {/* 헤더 섹션 */}
        <MainContent /> {/* 메인 콘텐츠 섹션 */}
        <Footer /> {/* 푸터 섹션 */}
      </div>
    </div>
  );
}

export default App;