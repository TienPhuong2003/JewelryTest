import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { login, getUserProfile } from '../../../services/api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PageWrapper from '../../../components/common/layout/PageWrapper';
import useTranslate from '../../../components/hooks/useTranslate';
import { commonMessage } from '../../../components/locales/intl';
import { defineMessages } from 'react-intl';
import styles from './AddressesUser.module.scss';

const messages = defineMessages({
  jewelryTitle: {
    id: 'src.pages.Login.index.jewelry',
    defaultMessage: 'Jewelry'
  },
});

const AddressesUser = () => {

  return (
    // <PageWrapper
    //   routes={[
    //     { breadcrumbName: translate.formatMessage(messages.jewelryTitle), path: `/jewelry` },
    //     ]}
    // >
      <div className={styles.profile}>
        <div className={styles.profileUser}>
          <span>ĐỊA CHỈ CỦA BẠN</span>
        </div>
      </div>
    // </PageWrapper>
  );
}

export default AddressesUser;