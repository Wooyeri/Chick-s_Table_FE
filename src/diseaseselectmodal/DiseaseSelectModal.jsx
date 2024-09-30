import React, { useState } from "react";
import xImage from '../assets/x.png';
import "./DiseaseSelectModal.css";

const DiseaseSelectModal = ({ onClose, onSubmit }) => {
  const [selectedDisease, setSelectedDisease] = useState("");
  const [bloodSugar, setBloodSugar] = useState({ first: "", second: "" });
  const [unknown, setUnknown] = useState(false);
  const [comment, setComment] = useState("질병을 선택해 주세요.");
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가

  const updateComment = (disease) => {
    switch (disease) {
      case "당뇨":
        return "공복 혈당 수치를 입력해주세요.";
      case "고혈압":
      case "저혈압":
        return "이완기/수축기를 입력해주세요.";
      case "알레르기":
        return "알레르기를 입력해주세요.";
      default:
        return "질병을 선택해 주세요.";
    }
  };

  const handleSelect = (disease) => {
    setSelectedDisease(disease);
    setErrorMessage(""); 
    setBloodSugar({ first: "", second: "" }); 
    setComment(updateComment(disease)); 
  };

  const handleSubmit = () => {
    if (!unknown) {
      if (["고혈압", "저혈압"].includes(selectedDisease)) {
        if (!bloodSugar.first || !bloodSugar.second) {
          setErrorMessage("이완기와 수축기를 모두 입력해주세요.");
          return;
        }
        if (isNaN(bloodSugar.first) || isNaN(bloodSugar.second)) {
          setErrorMessage("숫자를 입력해주세요.");
          return;
        }
      } else if (selectedDisease === "당뇨") {
        if (isNaN(bloodSugar.first) || bloodSugar.first === "") {
          setErrorMessage("숫자를 입력해주세요.");
          return;
        }
      } else if (selectedDisease === "알레르기") {
        if (!isNaN(bloodSugar.first) || bloodSugar.first === "") {
          setErrorMessage("문자를 입력해 주세요.");
          return;
        }
      } else if (!bloodSugar.first) {
        setErrorMessage("아무것도 선택되지 않았습니다.");
        return;
      }
    }

    const contents = unknown
      ? "모름"
      : ["고혈압", "저혈압"].includes(selectedDisease)
      ? `${bloodSugar.first}/${bloodSugar.second}`
      : bloodSugar.first;

    const diseaseData = {
      name: selectedDisease,
      contents, // details를 contents로 변경
    };
    onSubmit(diseaseData);
    onClose(); 
  };

  const handleInputChange = (value, part) => {
    setBloodSugar((prev) => ({ ...prev, [part]: value }));
    setErrorMessage(""); 
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <img src={xImage} alt="x 아이콘" style={{ width: '15px', height: '15px' }} />
        </button>
        <h3>질병 선택</h3>

        {selectedDisease && (
          <div className="blood-sugar-input">
            <label>{selectedDisease}</label>
            {["고혈압", "저혈압"].includes(selectedDisease) ? (
              <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <input
                  type="number"
                  value={bloodSugar.first}
                  onChange={(e) => handleInputChange(e.target.value, "first")}
                  placeholder="이완기"
                  style={{ width: "55px", textAlign: "center" }}
                />
                <span>/</span>
                <input
                  type="number"
                  value={bloodSugar.second}
                  onChange={(e) => handleInputChange(e.target.value, "second")}
                  placeholder="수축기"
                  style={{ width: "55px", textAlign: "center" }}
                />
              </div>
            ) : (
              <input
                type={selectedDisease === "알레르기" ? "text" : "number"}
                value={bloodSugar.first}
                onChange={(e) => handleInputChange(e.target.value, "first")}
                placeholder={selectedDisease === "알레르기" ? "알레르기 종류" : "수치 입력"}
                style={{ width: "100px", marginRight: "10px" }}
              />
            )}
            <label style={{ marginLeft: "25px" }}>모름</label>
            <input
              type="checkbox"
              checked={unknown}
              onChange={(e) => setUnknown(e.target.checked)}
            />
          </div>
        )}

        {errorMessage && (
          <p style={{ color: "red", fontSize: "12px", marginTop: "-10px", marginBottom: "3px" }}>
            {errorMessage}
          </p>
        )}

        <p style={{ marginTop: "0px", marginBottom: "10px" }}>{comment}</p>

        <div className="disease-options">
          <button
            className={`disease-button ${selectedDisease === "당뇨" ? "selected" : ""}`}
            onClick={() => handleSelect("당뇨")}
          >
            당뇨
          </button>
          <button
            className={`disease-button ${selectedDisease === "고혈압" ? "selected" : ""}`}
            onClick={() => handleSelect("고혈압")}
          >
            고혈압
          </button>
          <button
            className={`disease-button ${selectedDisease === "알레르기" ? "selected" : ""}`}
            onClick={() => handleSelect("알레르기")}
          >
            알레르기
          </button>
          <button
            className={`disease-button ${selectedDisease === "저혈압" ? "selected" : ""}`}
            onClick={() => handleSelect("저혈압")}
          >
            저혈압
          </button>
        </div>

        <button className="confirm-button" onClick={handleSubmit}>
          선택
        </button>
      </div>
    </div>
  );
};

export default DiseaseSelectModal;
