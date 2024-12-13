import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BsChatDots } from 'react-icons/bs';
import { FaLink } from 'react-icons/fa';

const BottomImage = () => {

    // Kakao SDK 초기화
    useEffect(() => {
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init('7c83ad9e898fc41e0bf2bffb14232074'); // Kakao Developers의 APP_KEY 입력
        }
    }, []);

    // AOS 초기화
    useEffect(() => {
        AOS.init({
            duration: 800, // 애니메이션 지속시간
            once: true, // 한 번만 애니메이션 실행
        });
    }, []);

    const handleKakaoShare = () => {
        if (window.Kakao) {
            window.Kakao.Link.sendDefault({
                objectType: 'feed',
                content: {
                    title: '기덕❤️승혜 결혼합니다',
                    description: '2025년 2월 22(토) 오후 4시 30분',
                    imageUrl: 'https://kimhyeongyu.github.io/03-footer/kakao_image.jpeg', // 이미지 URL 입력
                    link: {
                        mobileWebUrl: 'https://kimhyeongyu.github.io',
                        webUrl: 'https://kimhyeongyu.github.io',
                    },
                },
                buttons: [
                    {
                        title: '청첩장 보러가기',
                        link: {
                            mobileWebUrl: 'https://kimhyeongyu.github.io',
                            webUrl: 'https://kimhyeongyu.github.io',
                        },
                    },
                ],
            });
        } else {
            alert('Kakao SDK가 로드되지 않았습니다.');
        }
    };

    const handleLinkCopy = () => {
        navigator.clipboard.writeText('https://kimhyeongyu.github.io');
        alert("링크주소가 복사되었습니다.");
    };

    return (
        <div style={{ backgroundColor: 'rgb(252, 250, 248)' }}>
            <div data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
                <div>     
                    <img
                        alt="cover_image"
                        fetchpriority="high"
                        decoding="async"
                        data-nimg="fill"
                        className="object-cover w-full h-full"
                        src="/03-footer/bottom_image.png"
                        style={{
                            width: '100%'
                        }}
                    />
                </div>

                {/* 공유 및 하단 정보 영역 */}
                <div style={{ padding: '20px', textAlign: 'center', backgroundColor: 'rgb(252, 250, 248)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ marginBottom: '15px', display: 'block', gap: '10px' }}>
                        <div 
                            onClick={handleKakaoShare} 
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 12px',
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}
                        >
                            <BsChatDots style={{ marginRight: '5px' }} />
                            <span>카카오톡 공유하기</span>
                        </div>
                        <div 
                            onClick={handleLinkCopy} 
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px 12px',
                                fontSize: '14px',
                                cursor: 'pointer'
                            }}
                        >
                            <FaLink style={{ marginRight: '5px' }} />
                            <span>링크주소 복사하기</span>
                        </div>
                    </div>
                    <p style={{ fontSize: '14px', color: '#666' }}>
                        Copyright 2025. <strong>FROM YUNJU</strong>. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BottomImage;
