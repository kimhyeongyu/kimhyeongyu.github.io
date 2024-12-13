import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/01-Header/CoverImage';
import MainContent from './components/02-MainContent/MainContent';
import Footer from './components/03-Footer/BottomImage';
import Modal from './components/04-Modal/AttendanceStatus';
import MusicPlay from './components/05-MusicPlay/MusicPlayer';
import SvgIntro from './components/06-SvgIntro/SvgIntro';

function App() {
  const [introComplete, setIntroComplete] = useState(false); // 기본값 false로 설정하여 인트로 표시
  const [showSvg, setShowSvg] = useState(false); // SVG 표시 상태
  const [a, seta] = useState(false); // 기본값 false로 설정하여 인트로 표시





  useEffect(() => {
    const timera = setTimeout(() => {
      console.log("2초");
      seta(true);
    }, 6800);

  });
  useEffect(() => {

       // SVG 애니메이션 0.5초 지연 후 표시
      const svgTimer = setTimeout(() => {
        setShowSvg(true);
      }, 600); // 0.5초 지연


     // 새로고침 시 화면을 최상단으로 이동
     window.scrollTo(0, 0);

    
    // 4초 후에 인트로 상태를 변경
    const timer = setTimeout(() => {
      setIntroComplete(true);
    }, 7500);

    // 컴포넌트가 언마운트될 때 타이머 정리
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // introComplete 상태에 따라 overflow 변경
    if (introComplete) {
      document.documentElement.style.overflow = 'auto'; // 스크롤 활성화
    } else {
      document.documentElement.style.overflow = 'hidden'; // 스크롤 비활성화
    }
  }, [introComplete]);
  
  return (
    <div className="App">
      
      {/* SVG 인트로 */}
      {!introComplete && (
      <div
        className={`svg-intro-wrapper ${a ? 'fade-out' : 'hidd5en'}`}
      >
         {showSvg && <SvgIntro />} {/* showSvg가 true일 때만 SvgIntro 렌더링 */}
      </div>
    )}
      {/* 메인 콘텐츠 */}
      <div
        className={`content-wrapper ${introComplete ? 'fade-in' : 'hidden'}`}
      >
        <div className="content">
          <MusicPlay />
          <Header />
          <MainContent />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
