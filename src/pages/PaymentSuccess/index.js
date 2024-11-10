import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentSuccess = () => {
  const [result, setResult] = useState('');

  useEffect(() => {
    const processPayment = async () => {
      const params = new URLSearchParams(window.location.search);

      const paymentParams = [
        'vnp_Amount', 'vnp_BankCode', 'vnp_BankTranNo', 'vnp_CardType',
        'vnp_OrderInfo', 'vnp_PayDate', 'vnp_ResponseCode', 'vnp_TmnCode',
        'vnp_TransactionNo', 'vnp_TransactionStatus', 'vnp_TxnRef', 'vnp_SecureHash'
      ];

      const paymentData = {};
      paymentParams.forEach(param => {
        paymentData[param] = params.get(param);
      });

      const { vnp_TxnRef, vnp_ResponseCode, vnp_SecureHash, vnp_Amount } = paymentData;

      if (vnp_TxnRef && vnp_ResponseCode && vnp_SecureHash && vnp_Amount) {
        try {
          const response = await axios.get(`http://localhost:3000/api/vnpay/vnpay_ipn`, {
            params: paymentData
          });

          localStorage.setItem('userId', response.data.invoice.user);

          console.log("response", response.data.invoice.user);
          setResult(JSON.stringify(response.data));
        } catch (error) {
          console.log(error);
          setResult(`Có lỗi xảy ra khi xử lý thanh toán: ${error.message}`);
        }
      } else {
        setResult('Không có thông tin thanh toán.');
      }
    };

    processPayment();
  }, []);

  return (
    <div>
      <h1>Giỏ hàng của bạn</h1>
      <div id="result">{result}</div>
    </div>
  );
};

export default PaymentSuccess;
