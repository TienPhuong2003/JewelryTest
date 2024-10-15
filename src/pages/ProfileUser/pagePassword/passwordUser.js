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
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessage('');

        // Kiểm tra độ dài mật khẩu mới
        if (newPassword.length < 8) {
            setErrorMessage('Mật khẩu mới phải có ít nhất 8 ký tự.');
            return;
        }

        // Kiểm tra xem mật khẩu xác nhận có khớp không
        if (newPassword !== confirmPassword) {
            setErrorMessage('Mật khẩu xác nhận không khớp.');
            return;
        }

        // Thực hiện logic để đặt lại mật khẩu ở đây
        console.log('Đặt lại mật khẩu thành công!');
    };

  return (
    // <PageWrapper
    //   routes={[
    //     { breadcrumbName: translate.formatMessage(messages.jewelryTitle), path: `/jewelry` },
    //     ]}
    // >
      <div className={styles.profile}>
        <div className={styles.profileUser}>
          <span className={styles.changePassword} style={{fontSize: '24px', fontWeight: '300'}}>ĐỔI MẬT KHẨU</span>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <Form onSubmit={handleSubmit}>
                <span style={{ fontSize: '14px', fontWeight: '400', color: '#0a0000' }}><strong>Lưu ý:</strong> Để đảm bảo tính bảo mật bạn vui lòng đặt lại mật khẩu với ít nhất 8 kí tự</span>
                <div style={{ marginBottom: '15px' }}>
                    <Form.Item>
                        Mật khẩu cũ *
                        <Input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </Form.Item>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <Form.Item>
                        Mật khẩu mới *
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </Form.Item>
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <Form.Item>
                        Xác nhận lại mật khẩu *
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </Form.Item>
                </div>
                <button type="submit" className={styles.resetPassword}>
                    Đặt lại mật khẩu
                </button>
            </Form>
        </div>
      </div>
    // </PageWrapper>
  );
}

export default PasswordUser;