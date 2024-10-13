import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { getUserProfile, register } from '../../services/api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import PageWrapper from '../../components/common/layout/PageWrapper';
import useTranslate from '../../components/hooks/useTranslate';
import { commonMessage } from '../../components/locales/intl';
import { defineMessages } from 'react-intl';
import { useNavigate } from 'react-router-dom';

const messages = defineMessages({
  jewelryTitle: {
    id: 'src.pages.Login.index.jewelry',
    defaultMessage: 'Jewelry'
  },
});

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const translate = useTranslate();

  const handleSubmit = async () => {
      const response = await register(firstName, lastName, email, phoneNumber, password);
      
      const verifyUrl = response.user.verifyUrl;
      const urlParams = new URLSearchParams(verifyUrl.split('?')[1]);
      const q = urlParams.get('q');
      
      setError(null);
      setEmail(response.email);
      navigate('/verifyRegister', { state: { q: q } });
  };

  return (
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input 
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input 
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Email address"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input 
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center">
          <p>Not a member? <a href="#!">Register or sign up with:</a></p>
          {/* test icon */}
          <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}> 
            <Button icon={<FontAwesomeIcon icon={faCheck}/>} style={{ color: '#1266f1' }} />
            <Button icon={<FontAwesomeIcon icon={faCheck}/>} style={{ color: '#1266f1' }} />
            <Button icon={<FontAwesomeIcon icon={faCheck}/>} style={{ color: '#1266f1' }} />
            <Button icon={<FontAwesomeIcon icon={faCheck}/>} style={{ color: '#1266f1' }} />
          </div>
        </div>
      </div>
  );
}

export default Register;
