import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { login, getUserProfile } from '../../../services/api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PageWrapper from '../../../components/common/layout/PageWrapper';
import useTranslate from '../../../components/hooks/useTranslate';
import { commonMessage } from '../../../components/locales/intl';
import { defineMessages } from 'react-intl';
import styles from './PasswordUser.module.scss';

const messages = defineMessages({
  jewelryTitle: {
    id: 'src.pages.Login.index.jewelry',
    defaultMessage: 'Jewelry'
  },
});

const PasswordUser = () => {
  const [email, setEmail] = useState('huycuong140203@gmail.com');
  const [profileData, setProfileData] = useState('');
  const translate = useTranslate();

  useEffect(() => {
      getProfile();
  }, []);

  const getProfile = async () => {
      const res = await getUserProfile(email);
      if (res) {
        setProfileData(res); // Đảm bảo bạn truy cập đúng vào dữ liệu phản hồi
      }
      console.log("Thông tin profile:", res);
  };

  return (
    // <PageWrapper
    //   routes={[
    //     { breadcrumbName: translate.formatMessage(messages.jewelryTitle), path: `/jewelry` },
    //     ]}
    // >
      <div className={styles.profile}>
        <div className={styles.profileUser}>
          <span>ĐỔI MẬT KHẨU</span>
          {profileData && (
            <div className={styles.user}>
                <span>Họ tên: {profileData.firstName} {profileData.lastName}</span>
                <span>Email: {profileData.email}</span>
                <span>Điện thoại: {profileData.phoneNumber}</span>
                <span>Công ty: </span>
                <span>Địa chỉ: {profileData.addresses.map(addr => addr.street).join(', ')}</span>
            </div>
          )}
        </div>
      </div>
    // </PageWrapper>
  );
}

export default PasswordUser;