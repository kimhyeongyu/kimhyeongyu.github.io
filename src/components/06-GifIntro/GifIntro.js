import React, { useEffect, useState } from 'react';
import './GifIntro.css';

const GifIntro = ({ onIntroEnd }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // 처음 렌더링 시 페이드인 시작
    const fadeInTimer = setTimeout(() => {
      setFadeIn(true);
    }, 100); // 약간의 딜레이 후 페이드인

    // 2.5초 후 페이드아웃 시작
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 2400);

    // 3초 후 onIntroEnd 호출
    const endTimer = setTimeout(() => {
      onIntroEnd();
    }, 3000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(endTimer);
    };
  }, [onIntroEnd]);

  return (
    <div
      className={`gif-intro ${fadeIn ? 'fade-in' : ''} ${
        fadeOut ? 'fade-out' : ''
      }`}
    >
      <img
        src="/06-gifintro/intro.gif" // GIF 파일 경로
        alt="Intro Animation"
        className="intro-gif"
      />
    </div>
  );
};

export default GifIntro;
