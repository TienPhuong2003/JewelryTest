import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOTP } from "../../services/api/authService"; // Import hàm xác minh OTP từ service
import styles from './VerifyOTP.module.scss'; // Cập nhật import sang SCSS Module

export default function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate(); // Khai báo useNavigate
  const { q } = location.state || {}; // Lấy giá trị của q từ state
  const [otp, setOtp] = useState(Array(6).fill('')); 

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // Cho phép nhập chữ và số
    if (/^[a-zA-Z0-9]*$/.test(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value; 
      setOtp(newOtp);

      // Tự động chuyển sang ô tiếp theo nếu đã nhập
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Chuyển về ô trước nếu nhấn phím Backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join(''); 
    
    try {
      const response = await verifyOTP(otpCode, q); // Gọi API xác minh OTP với q
      console.log('Xác minh thành công:', response);
      alert(`Xác minh mã OTP thành công!`);
      navigate('/login');
    } catch (error) {
      alert(error); // Hiển thị thông báo lỗi
    }
  };

  return (
    <div className={styles.otp}> 
      <div className={styles.otpContainer}>
        <header><i className="bx bxs-check-shield"></i></header>
        <h4>Xác Minh OTP</h4>
        <form className={styles.otpForm} onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                id={`otp-input-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                maxLength="1"
                required
                autoComplete="off"
              />
            ))}
          </div>
          <button type="submit" className={styles.active}>
            Xác Minh
          </button>
        </form>
      </div>
    </div>
  );
}
