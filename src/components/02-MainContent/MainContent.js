// src/components/02-MainContent/MainContent.js
import React from 'react';
import Section1 from './Section1/InvitationText';  // Section1 임포트
import Section2 from './Section2/WeddingDatePicker';  // Section2 임포트
import Section3 from './Section3/Gallery';  // Section3 임포트
import Section4 from './Section4/KakaoMap';  // Section4 임포트
import Section4_1 from './Section4_1/AttendanceStatus';  // Section4 임포트
import Section5 from './Section5/MobileInvitation';  // Section5 임포트
import Section6 from './Section6/Guestbook';  // Section6 임포트


const MainContent = () => {
  return (
    <main>
      <Section1 />  {/* Section1 렌더링 */}
      <Section2 />  {/* Section2 렌더링 */}
      <Section3 />  {/* Section3 렌더링 */}
      <Section4 />  {/* Section4 렌더링 */}
      <Section4_1 />  {/* Section4 렌더링 */}
      <Section5 />  {/* Section5 렌더링 */}
      <Section6 />  {/* Section6 렌더링 */}
    </main>
  );
};

export default MainContent;
