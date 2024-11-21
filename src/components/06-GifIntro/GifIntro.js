import React, { useState, useEffect } from 'react';
import './GifIntro.css'; // CSS 파일 임포트

function GifIntro({ onEnd }) {
    useEffect(() => {
      const gifDuration = 3000; // GIF 재생 시간 (밀리초 단위)
      const timer = setTimeout(() => {
        onEnd(); // GIF 종료
      }, gifDuration);
  
      return () => clearTimeout(timer); // 타이머 정리
    }, [onEnd]);
  
    return (
      <div className="fullscreen-gif">
        <img
          src="/heart-animation.gif" // GIF 경로
          alt="Loading Animation"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover', // GIF 비율 유지
          }}
        />
      </div>
    );
  }
  
  export default GifIntro;
  