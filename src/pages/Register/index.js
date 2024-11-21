import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/api/authService"; // Import hàm đăng ký từ service
import styles from "./register.module.scss"; // Import SCSS module
import Breadcrumb from "../../components/Breadcrumb";
import { notification } from "antd";

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const breadcrumbItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Đăng ký" },
  ];

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = { firstName, lastName, email, phoneNumber, password }; // Dữ liệu đăng ký
  //   console.log(data);
  //   try {
  //     const response = await register(data); // Gọi API đăng ký
  //     console.log("Đăng ký thành công:", response);
  //     const urlParams = new URLSearchParams(
  //       response.user.verifyUrl.split("?")[1],
  //     );
  //     const q = urlParams.get("q"); // Lấy giá trị của q
  //     navigate("/otp", { state: { q } }); // Truyền q vào state để sử dụng trong trang OTP
  //   } catch (error) {
  //     alert(error.message); // Hiển thị thông báo lỗi
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Kiểm tra độ dài mật khẩu
    if (password.length < 8) {
      notification.error({
        message: "Thông báo",
        description: "Mật khẩu phải có ít nhất 8 ký tự.",
      });
      return; // Dừng thực hiện nếu mật khẩu không hợp lệ
    }
    const data = { firstName, lastName, email, phoneNumber, password }; // Dữ liệu đăng ký
    console.log(data);
    try {
      const response = await register(data); // Gọi API đăng ký
      console.log("Đăng ký thành công:", response);
      const urlParams = new URLSearchParams(
        response.user.verifyUrl.split("?")[1],
      );
      const q = urlParams.get("q"); // Lấy giá trị của q
      navigate("/otp", { state: { q } }); // Truyền q vào state để sử dụng trong trang OTP
    } catch (error) {
      alert(error.message); // Hiển thị thông báo lỗi
    }
  };

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className={styles["register-container"]}>
        <h1>ĐĂNG KÝ</h1>
        <p className={styles["login-link"]}>
          Đã có tài khoản, đăng nhập <Link to="/">tại đây</Link>
        </p>
        <form className={styles["register-form"]} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Họ"
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tên"
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Số điện thoại"
            required
            value={phoneNumber}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={styles["register-button"]}>
            ĐĂNG KÝ
          </button>
        </form>
        <div className={styles["social-login"]}>
          <p>Hoặc đăng nhập bằng</p>
          <div className={styles["social-buttons"]}>
            <button className={styles["facebook-button"]}>
              <i className="fab fa-facebook-f"></i> Facebook
            </button>
            <button className={styles["google-button"]}>
              <i className="fab fa-google"></i> Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
