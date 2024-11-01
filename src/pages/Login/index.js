import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, requestOTP, sendOTP } from "../../services/api/authService"; // Import các hàm từ service
import styles from "./Login.module.scss"; // Import SCSS
import Breadcrumb from '../../components/Breadcrumb';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState(""); // Email cho quên mật khẩu
  const navigate = useNavigate();

  const breadcrumbItems = [
    { label: 'Trang chủ', path: '/' },
    { label: 'Đăng nhập' }
  ];

  // Xử lý đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { userEmail, accessToken } = await login(email, password); // Gọi API đăng nhập
      console.log("Đăng nhập thành công:", accessToken);
      setEmail(userEmail);
      // Lưu thông tin người dùng và điều hướng đến trang chủ (hoặc trang khác)
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("accessToken",accessToken);
      navigate("/account", { state: { email: userEmail } });
    } catch (error) {
      alert(error.message);
    }
  };

  // Xử lý yêu cầu OTP quên mật khẩu
  const handleResetPassword = async () => {
    try {
      const otpData = await sendOTP(forgotEmail); // Gọi API yêu cầu OTP
      console.log("Yêu cầu OTP thành công:", otpData);
      navigate("/reset-password");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className={styles.loginContainer}>
        <div>
          <h1>ĐĂNG NHẬP</h1>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className={styles.loginButton}>
              ĐĂNG NHẬP
            </button>
          </form>
          <div className={styles.forgotPasswordRegister}>
            <a
              href="#"
              className={styles.forgotPassword}
              onClick={() => setShowForgotPassword(!showForgotPassword)}
            >
              Quên mật khẩu?
            </a>
            <Link to="/register" className={styles.registerLink}>
              Đăng ký tại đây
            </Link>
          </div>
          {showForgotPassword && (
            <div className={styles.forgotPasswordForm}>
              <input
                type="email"
                placeholder="Nhập email để lấy lại mật khẩu"
                required
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
              <button
                className={styles.resetPasswordButton}
                onClick={handleResetPassword}
              >
                Lấy lại mật khẩu
              </button>
            </div>
          )}
          <div className={styles.socialLogin}>
            <p>hoặc đăng nhập qua</p>
            <div className={styles.socialButtons}>
              <button className={styles.facebookButton}>
                <i className="fab fa-facebook-f"></i> Facebook
              </button>
              <button className={styles.googleButton}>
                <i className="fab fa-google"></i> Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
