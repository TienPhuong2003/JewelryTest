import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, requestOTP, sendOTP } from "../../services/api/authService"; // Import các hàm từ service
import styles from "./Login.module.scss"; // Import SCSS
import Breadcrumb from '../../components/Breadcrumb';
import { notification } from "antd";

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
      const { userEmail, accessToken, decodedToken ,userId} = await login(email, password); 
      console.log("Đăng nhập thành công:", accessToken);
      notification.success({
        message: "Đăng nhập thành công",
        description: "Bạn đã đăng nhập thành công",
      });
      setEmail(userEmail);
      // localStorage.setItem("userEmail", userEmail);
      // localStorage.setItem("accessToken",accessToken);
      if (decodedToken === "user") {
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("decodedToken", decodedToken);
        localStorage.setItem("userId", userId);
        navigate("/account", { state: { email: userEmail } });
      } else if (decodedToken === "admin") {
        localStorage.setItem("decodedToken", decodedToken);
        navigate("/admin");
      } else {
        navigate("/login"); 
      }
    } catch (error) {
      notification.error({
        message: "Đăng nhập thất bại",
        description: "Bạn đã nhập sai mật khẩu",
      });
    }
  };

  // Xử lý yêu cầu OTP quên mật khẩu
  const handleResetPassword = async () => {
    try {
      const otpData = await sendOTP(forgotEmail); // Gọi API yêu cầu OTP
      console.log("Yêu cầu OTP thành công:", otpData);
      navigate("/reset-password");
    } catch (error) {
      notification.error({
        message: "Yêu cầu OTP thất bại",
        description: error.message,
      });
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
