import { useRouter } from "react-router-dom";
import { getCookie, STORAGEKEY } from "../service/cookie";

export const formatCurrency = (number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(number);
};

export const formatMultiCurrency = (value1, value2) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  if (value2 > 0) {
    return `${formatter.format(value1)} - ${formatter.format(value2)}`;
  } else {
    return `${formatter.format(value1)}`;
  }
};

export const formatAmoutProductSold = (value) => {
  if (value > 999 && value <= 9999) {
    return Math.sign(value) * (Math.abs(value) / 1000).toFixed(1) + "k";
  } else if (Math.abs(value) > 9999) {
    return Math.sign(value) * (Math.abs(value) / 1000000).toFixed(3) + "tr";
  } else {
    return value;
  }
};

export const formatAfterSale = (value, percent) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(value - (value * percent) / 100);
};

export const checkLogin = async () => {
  const accessToken = await getCookie(STORAGEKEY.ACCESS_TOKEN);

  if (!accessToken) {
    window.location.href = "/login";
    return false;
  }

  return true;
};
