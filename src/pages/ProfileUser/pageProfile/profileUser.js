import React, { useEffect, useState } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import { getUserProfile } from "../../../services/api/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import PageWrapper from "../../../components/common/layout/PageWrapper";
import useTranslate from "../../../components/hooks/useTranslate";
import { commonMessage } from "../../../components/locales/intl";
import { defineMessages } from "react-intl";
import styles from "./ProfileUser.module.scss";
// import Breadcrumb from "../../../components/Breadcrumb";

const messages = defineMessages({
  jewelryTitle: {
    id: "src.pages.Login.index.jewelry",
    defaultMessage: "Jewelry",
  },
});

const ProfileUser = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = localStorage.getItem("userEmail");

  // const breadcrumbItems = [
  //   { label: "Trang chủ", path: "/" },
  //   { label: "Trang khách hàng" },
  // ];

  console.log(email);
  useEffect(() => {
    const fetchProfile = async () => {
      console.log("Email value:", email);
      try {
        setLoading(true);
        const data = await getUserProfile(email);
        console.log("Response data:", data);
        setProfileData(data);
      } catch (err) {
        console.error("Error details:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchProfile();
    }
  }, [email]);

  return (
    <>
      {/* <Breadcrumb items={breadcrumbItems} /> */}
      <div className={styles.profile}>
        <div className={styles.profileUser}>
          <span style={{ fontSize: "24px", fontWeight: "300" }}>
            THÔNG TIN TÀI KHOẢN
          </span>
          {profileData && (
            <div className={styles.user}>
              <span>
                Họ tên: {profileData.firstName} {profileData.lastName}
              </span>
              <span>Email: {profileData.email}</span>
              <span>Điện thoại: {profileData.phoneNumber}</span>
              <span>Địa chỉ: </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileUser;
