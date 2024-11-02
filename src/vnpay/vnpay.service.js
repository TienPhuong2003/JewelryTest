const Invoice = require("../models/invoice.model");
const crypto = require("crypto");
require('dotenv').config({ path: '.env.development' });
var querystring = require('qs');
const processPayment = async (invoice) => {
    const date = new Date();
    const { default: dateFormat } = await import("dateformat");
    const createDate = dateFormat(date, "yyyymmddHHMMss");
    // Add 10 minutes (600000 milliseconds) to the date for the expiry
    const expiryDate = new Date(date.getTime() + 10 * 60 * 1000);
    const RETURN_URL = "http://localhost:3000/payment";
    let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';

    var vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = process.env.VNP_TMNCODE;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = 'VND';
    vnp_Params['vnp_TxnRef'] = Date.now().toString();
    vnp_Params['vnp_OrderInfo'] = 'account_id ' ;
    vnp_Params['vnp_OrderType'] = 'billpayment';
    vnp_Params['vnp_Amount'] =  invoice.amountToPay * 100;
    vnp_Params['vnp_ReturnUrl'] = RETURN_URL;
    vnp_Params['vnp_IpAddr'] = '13.160.92.202';
    vnp_Params['vnp_CreateDate'] = createDate;
    // vnp_Params['vnp_BankCode'] = 'NCB';

    vnp_Params = sortObject(vnp_Params);

    var signData = querystring.stringify(vnp_Params, { encode: false });

    var crypto = require('crypto');

    var hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET);

    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

    vnp_Params['vnp_SecureHash'] = signed;

    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return vnpUrl;
};

const signedParams = (vnp_Params)=>{
    var secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  var signData = querystring.stringify(vnp_Params, { encode: false });

  var hmac = crypto.createHmac('sha512', process.env.VNP_HASHSECRET);

  var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');

  return {
    secureHash,
    signed,
    vnp_Params,
  };
}

const processVnpayIpn = (params) => {
   const { secureHash, signed, vnp_Params } = signedParams(params);
   console.log(vnp_Params)
    console.log(secureHash)
    console.log(signed)
    if (secureHash === signed) {
      var orderId = vnp_Params['vnp_TxnRef'];
      var rspCode = vnp_Params['vnp_ResponseCode'];
      var info = vnp_Params['vnp_OrderInfo'];
      var amount = vnp_Params['vnp_Amount'];
      const account_id = info.split('+')[1];

      let message = '';
      amount = parseFloat(amount) / 100;

      switch (rspCode) {
        case '00':
          message ="success";
          break;
    
        default:
          message = 'Không xác định';
      }

      return { rspCode: rspCode, message: message };
    } else {
      return { RspCode: '97', Message: 'Mã hash không hợp lệ' };
    }
  }
const sortObject = (obj) => {
    var sorted = {};
    var str = [];
    var key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }

    str.sort();

    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }

    return sorted;
};

// Hàm cập nhật trạng thái hóa đơn
const updateInvoiceStatus = async (orderId, status) => {
    console.log("orderId", orderId)
    await Invoice.updateOne({ orderId }, { status });
};
module.exports = {
    processPayment,
    processVnpayIpn,
}