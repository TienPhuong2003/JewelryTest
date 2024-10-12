import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { login, getUserProfile } from '../../services/api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PageWrapper from '../../components/common/layout/PageWrapper';
import useTranslate from '../../components/hooks/useTranslate';
import { commonMessage } from '../../components/locales/intl';
import { defineMessages } from 'react-intl';
import styles from './ProfileUser.module.scss';

const messages = defineMessages({
  jewelryTitle: {
    id: 'src.pages.Login.index.jewelry',
    defaultMessage: 'Jewelry'
  },
});

const ProfileUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileData, setProfileData] = useState('');
  const translate = useTranslate();

  const handleSubmit = async () => {
    try {
      const {accessToken, userEmail} = await login(email, password);
      console.log('Đăng nhập thành công:', userEmail);
      setIsLoggedIn(true);  // Đánh dấu người dùng đã đăng nhập thành công
      setError(null);  // Xóa lỗi nếu có4
      setEmail(userEmail);
    } catch (error) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.');
    }
  };

  useEffect(() => {
    if (isLoggedIn && email) {  // Chỉ gọi profile nếu đã đăng nhập và có email
      getProfile();
    }
  }, [isLoggedIn, email]);
  
  const getProfile = async () => {
    try {
        // Sử dụng email đã giải mã để gọi profile
        let res = await getUserProfile(email);
        if(res) {
          setProfileData(res); // Lưu dữ liệu profile
        }
        console.log("Thông tin profile:", res);
    } catch (error) {
        console.error("Lỗi khi lấy thông tin profile:", error);
    }
  }

  return (
    // <PageWrapper
    //   routes={[
    //     { breadcrumbName: translate.formatMessage(messages.jewelryTitle), path: `/jewelry` },
    //     ]}
    // >
      <div className={styles.profile}>
        <div className={styles.profileButton}>
          <h1>Profile User</h1>
        </div>

        <div className={styles.profileUser}>
          <span>THÔNG TIN TÀI KHOẢN</span>

          <div className={styles.user}>
              <span>Họ tên: </span>
              <span>Email: </span>
              <span>Điện thoại: </span>
              <span>Công ty: </span>
              <span>Địa chỉ: </span>
          </div>

          {/* Hiển thị thông tin người dùng */}
          {/* {profile && (
            <div>
              <h2>Thông tin người dùng</h2>
              <p>Tên: {profile.firstName} {profile.lastName}</p>
              <p>Email: {profile.email}</p>
              <p>Số điện thoại: {profile.phoneNumber}</p>
              <p>Địa chỉ: {profile.addresses.map(addr => addr.street).join(', ')}</p>
            </div>
          )} */}
        </div>
      </div>
    // </PageWrapper>
  );
}

export default ProfileUser;
