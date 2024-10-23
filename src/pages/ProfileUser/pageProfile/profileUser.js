import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { login, getUserProfile } from '../../../services/api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PageWrapper from '../../../components/common/layout/PageWrapper';
import useTranslate from '../../../components/hooks/useTranslate';
import { commonMessage } from '../../../components/locales/intl';
import { defineMessages } from 'react-intl';
import styles from './ProfileUser.module.scss';

const messages = defineMessages({
  jewelryTitle: {
    id: 'src.pages.Login.index.jewelry',
    defaultMessage: 'Jewelry'
  },
});

const ProfileUser = () => {
  
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile(email);
        setProfileData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchProfile();
    }
  }, [email]);
  
  // const [email, setEmail] = useState('huycuong140203@gmail.com');
  // const [profileData, setProfileData] = useState('');
  // const translate = useTranslate();

  // useEffect(() => {
  //     getProfile();
  // }, []);

  // const getProfile = async () => {
  //     const res = await getUserProfile(email);
  //     if (res) {
  //       setProfileData(res); // Đảm bảo bạn truy cập đúng vào dữ liệu phản hồi
  //     }
  //     // setEmail(res.email);
  //     console.log(res.email);
      
  //     console.log("Thông tin profile:", res);
  // };

  return (
    // <PageWrapper
    //   routes={[
    //     { breadcrumbName: translate.formatMessage(messages.jewelryTitle), path: `/jewelry` },
    //     ]}
    // >
      <div className={styles.profile}>
        <div className={styles.profileUser}>
          <span style={{fontSize: '24px', fontWeight: '300'}}>THÔNG TIN TÀI KHOẢN</span>
          {profileData && (
            <div className={styles.user}>
                <span>Họ tên: {profileData.firstName} {profileData.lastName}</span>
                <span>Email: {profileData.email}</span>
                <span>Điện thoại: {profileData.phoneNumber}</span>
                <span>Địa chỉ: </span>
            </div>
          )}
        </div>
      </div>
    // </PageWrapper>
  );
}

export default ProfileUser;