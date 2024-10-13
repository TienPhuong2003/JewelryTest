import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyOTP } from '../../services/api/api'; // Đảm bảo đường dẫn import đúng

const VerifyRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { q } = location.state || {};
  const [otp, setOtp] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleVerify = async (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của form submit

    try {
      const response = await verifyOTP(q, otp);
      console.log('OTP verification successful:', response);
      setSuccess(true);
      setError(null);  // Xóa lỗi nếu có

      // Chuyển hướng người dùng đến trang đăng nhập hoặc trang khác
      navigate('/login');
    } catch (error) {
      console.error('OTP verification failed:', error);
      setError('Xác thực OTP thất bại. Vui lòng kiểm tra lại mã OTP.');
    }
  };

  return (
    <div>
      <h1>Verify Email</h1>
      <p>OTP đã được gửi, vui lòng kiểm tra email của bạn.</p>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Xác thực OTP thành công!</p>}
      {/* Form nhập mã OTP và gọi handleVerify để xác thực */}
      <form onSubmit={handleVerify}>
        <input 
          type="text" 
          placeholder="Enter OTP" 
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default VerifyRegister;
