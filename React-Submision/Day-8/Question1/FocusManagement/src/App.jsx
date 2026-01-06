import React, { useRef, useState } from "react";

const OTPInput = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleClear = () => {
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0].focus();
  };

  const completeOTP = otp.join("");

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <h2>Enter Your OTP</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            style={{
              width: "40px",
              height: "40px",
              textAlign: "center",
              fontSize: "20px",
            }}
          />
        ))}
      </div>

      <button onClick={handleClear} style={{ marginTop: "15px" }}>
        Clear
      </button>

      <div style={{ marginTop: "20px", fontSize: "18px" }}>
        <strong>OTP:</strong> {completeOTP}
      </div>
    </div>
  );
};

export default OTPInput;
