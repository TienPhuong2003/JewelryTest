import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { changePassword } from "../../services/api/authService"; // Ensure this points to your API service
import styles from "./ResetPassword.module.scss";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const email = localStorage.getItem("email");

  console.log(email);
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu mới và xác nhận mật khẩu không khớp.");
      return;
    }

    try {
      const q = email; // Replace with the actual JWT or retrieve it from your context
      const response = await changePassword({ otp, newPassword, confirmPassword }, q);
      setSuccessMessage("Đặt lại mật khẩu thành công!");
      setErrorMessage(""); // Clear any previous error messages
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      setSuccessMessage(""); // Clear any previous success messages
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.profileUser}>
        <span
          className={styles.changePassword}
          style={{ fontSize: "24px", fontWeight: "300" }}
        >
          ĐỔI MẬT KHẨU
        </span>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <span
            style={{ fontSize: "14px", fontWeight: "400", color: "#0a0000" }}
          >
            <strong>Lưu ý:</strong> Để đảm bảo tính bảo mật bạn vui lòng đặt lại
            mật khẩu với ít nhất 8 kí tự
          </span>
          <div style={{ marginBottom: "15px" }}>
            <Form.Item>
              OTP
              <Input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </Form.Item>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <Form.Item>
              Mật khẩu mới *
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </Form.Item>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <Form.Item>
              Xác nhận lại mật khẩu *
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </Form.Item>
          </div>
          <Button htmlType="submit" className={styles.resetPassword}>
            Đặt lại mật khẩu
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;