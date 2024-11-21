import React from 'react';
import './CoverImage.css'; // CSS 파일 임포트

const CoverImage = () => {
  return (
    <div className="cover-image-container">
      {/* 이미지와 비디오를 같은 부모에 배치 */}
      <div className="cover-image-wrapper">
        
        {/* 메인 이미지 */}
        <img
          alt="cover_image"
          fetchpriority="high"
          decoding="async"
          data-nimg="fill"
          className="cover-image"
          src="/01-header/main.jpeg" // public 폴더에서 이미지 경로
        />

        {/* 눈송이 비디오 */}
        <video
          className="cover-video"
          playsInline
          autoPlay
          muted
          loop
        >
          <source src="/01-header/snow.webm" type="video/webm" />
        </video>

        {/* 텍스트 섹션 */}
        <div className="cover-text-section">
          <p className="cover-text-title">
            성 기 덕 <span className="separator">|</span> 노 승 혜
          </p>
          <p className="cover-text-date">2025.02.22 SAT 16:30PM</p>
          <p className="cover-text-location">수원 메리빌리아 컨벤션 홀</p>
        </div>

        <div className="cover-border"></div>
      </div>
    </div>
  );
};

export default CoverImage;
