import moment from 'moment';
import qs from 'qs';
import crypto from 'crypto';
import randomstring from 'randomstring';

export const create_payment_vnpay = async (req, res) => {
  const code = randomstring.generate({
    charset: 'numeric',
    length: 4
  });
  const date = new Date();

  const vnp_Params = {};
  vnp_Params['vnp_IpAddr'] = encodeURIComponent(req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress);

  vnp_Params['vnp_TxnRef'] = code;
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = process.env.VNPAY_TMNCODE;
  vnp_Params['vnp_Amount'] = 10000 * 100;
  vnp_Params['vnp_CreateDate'] = moment(date).format('yyyyMMDDHHmmss');
  vnp_Params['vnp_CurrCode'] = 'VND';
  vnp_Params['vnp_Locale'] = 'vn';
  vnp_Params['vnp_OrderInfo'] = encodeURIComponent('thanh toan cho giao dich').replace(/%20/g, '+');
  vnp_Params['vnp_OrderType'] = 'other';
  vnp_Params['vnp_ReturnUrl'] = encodeURIComponent(process.env.VNPAY_RETURN_LINK);

  const arrayKeys = Object.keys(vnp_Params);

  arrayKeys.sort();
  const sortedObject = {};
  for (const key of arrayKeys) {
    sortedObject[key] = vnp_Params[key];
  }

  const signData = qs.stringify(sortedObject, { encode: false });
  const hmac = crypto.createHmac("sha512", process.env.VNPAY_HASHSECRECT);

  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

  sortedObject['vnp_SecureHash'] = signed;

  return res.status(200).send({ url: `${process.env.VNPAY_URL}?${qs.stringify(sortedObject, { encode: false })}` });
}