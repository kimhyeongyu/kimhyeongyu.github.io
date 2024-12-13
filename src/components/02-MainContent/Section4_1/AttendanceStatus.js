import React, { useState } from "react";
import styles from "./AttendanceStatus.module.css";

const AttendanceStatus = () => {
  const [isOpen, setIsOpen] = useState(false); // 기본값 false로 변경
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [side, setSide] = useState(""); // 신랑측/신부측 선택
  const [attendance, setAttendance] = useState(""); // 참석/미참석 선택
  const [name, setName] = useState(""); // 이름 입력
  const [consent, setConsent] = useState(true); // 개인정보 동의

  const openModal = () => setIsOpen(true); // 모달 열기
  const closeModal = () => {
    setIsOpen(false);
    setIsSecondModalOpen(false);
  };

  const openSecondModal = () => {
    setIsOpen(false);
    setIsSecondModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!side || !attendance || !name || !consent) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append("side", side);
      formData.append("attendance", attendance);
      formData.append("name", name);
      formData.append("consent", consent ? 1 : 0);

      const response = await fetch(
        "https://sn0711.mycafe24.com/weddingapi/attendance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      const result = await response.json();
      if (result.success) {
        alert("참석여부가 제출되었습니다.");
        closeModal();
      } else {
        alert("제출에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <div style={{paddingBottom: "24px", paddingTop: "10px", backgroundColor: "rgb(252, 250, 248)" }}>
          <p
              style={{ fontSize: '14px',
                letterSpacing: '3px',
                /* color: rgb(102, 102, 102); */
                marginBottom: '10px',
                paddingBottom: '20px' }}
              className="aos-init aos-animate"
          >
              참석여부 전달하기
          </p>
          
          <p className="invitation-text">참석여부를 보내주시면 도움이 됩니다.</p>
          <br></br>


        {/* 모달 열기 버튼 */}
        <div style={{ textAlign: "center", color : "rgb(252, 250, 248)"  }}>
          <button
            onClick={openModal}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              backgroundColor: "#a19892",
              color: "#fff",
              border: "none",
              width: "82%"
            }}
          >
          전달하기
          </button>
        </div>

      </div>
      {/* 첫 번째 모달 */}
      {isOpen && (
        <div
          className={styles["AttendanceStatus-overlay"]}
          onClick={closeModal}
        >
          <div
            className={styles["AttendanceStatus-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles["AttendanceStatus-close-button"]}
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className={styles["AttendanceStatus-content_h2"]}>
              참석 여부 전달하기
            </h2>
            <p>
              참석여부를 미리 전달주시면<br></br>
              예식 준비에 큰 도움이 됩니다 :)
            </p>
            <hr />
            <div className={styles["AttendanceStatus-event-details"]}>
              <p className={styles["AttendanceStatus-event-details_font"]}>
                📅 2025.02.22 SAT
              </p>
              <p className={styles["AttendanceStatus-event-details_font"]}>
                📍 수원 메리빌리아 컨벤션 홀
              </p>
            </div>
            <button
              className={styles["AttendanceStatus-confirm-button"]}
              onClick={openSecondModal}
            >
              참석여부 전달하기
            </button>
          </div>
        </div>
      )}

      {/* 두 번째 모달 */}
      {isSecondModalOpen && (
        <div
          className={styles["AttendanceStatus-overlay"]}
          onClick={closeModal}
        >
          <div
            className={styles["AttendanceStatus-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles["AttendanceStatus-content_h2"]}>
              참석여부 전달하기
            </h2>
            <div className={styles.section}>
              <label className={styles["section-label"]}>* 참석하시는 측</label>
              <div className={styles["button-group"]}>
                <button
                  className={`${styles["choice-button"]} ${
                    side === "신랑측" ? styles.selected : ""
                  }`}
                  onClick={() => setSide("신랑측")}
                >
                  신랑측
                </button>
                <button
                  className={`${styles["choice-button"]} ${
                    side === "신부측" ? styles.selected : ""
                  }`}
                  onClick={() => setSide("신부측")}
                >
                  신부측
                </button>
              </div>
            </div>

            <div className={styles.section}>
              <label className={styles["section-label"]}>* 참석여부</label>
              <div className={styles["button-group"]}>
                <button
                  className={`${styles["choice-button"]} ${
                    attendance === "참석" ? styles.selected : ""
                  }`}
                  onClick={() => setAttendance("참석")}
                >
                  참석
                </button>
                <button
                  className={`${styles["choice-button"]} ${
                    attendance === "미참석" ? styles.selected : ""
                  }`}
                  onClick={() => setAttendance("미참석")}
                >
                  미참석
                </button>
              </div>
            </div>

            <div className={styles["input-group"]}>
              <label htmlFor="name">*이름</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                style={{ height: "25px" }}
              />
            </div>

            <div className={styles["consent-group"]}>
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <label htmlFor="consent" className={styles["consent"]}>
                개인정보 수집에 동의합니다.
              </label>
            </div>

            <button className={styles["submit-button"]} onClick={handleSubmit}>
              제출하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceStatus;
