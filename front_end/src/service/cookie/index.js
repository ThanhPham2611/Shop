import moment from 'moment';
import {Cookies} from 'react-cookie'

const cookies = new Cookies()

export const STORAGEKEY = {
  ACCESS_TOKEN: 'stripe_token',
}

export const setCookie = (key, value) => 
  cookies.set(key, value, {
    expires: new Date(moment().add(8, 'hours').format('YYYY-MM-DD HH:mm')),
  });

export const getCookie = (key) => cookies.get(key);

export const removeCookie = (key) => cookies.remove(key);

export const getToken = async () => {
  const token = await getCookie(STORAGEKEY.ACCESS_TOKEN);
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}