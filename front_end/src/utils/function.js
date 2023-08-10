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

export const checkLogin = async (fnc) => {
  const accessToken = await getCookie(STORAGEKEY.ACCESS_TOKEN);
  if (accessToken !== undefined) {
    return () => fnc();
  } else {
    window.location.href = '/login'
  }
};

export const debounce = (func, delay) => {
  let timeOutId;

  return (...args) => {
    clearTimeout(timeOutId);

    timeOutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type
  }
}

export const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

export const getYear = (currentYear) => {
  let arrayYear = []
  for (let i = 0; i < 100; i++) {
    arrayYear.push({
      value: currentYear - i,
      label: currentYear - i
    });
  }
  return arrayYear;
}

export const getMonth = (arrayMonth) => {
  const getArray = arrayMonth?.map((month, index) => {
    return {
      value: index + 1,
      label: month
    }
  })
  return getArray;
}

export const getDay = (startDay, endDay) => {
  let arrayDay = [];
  for (let i = startDay; i <= endDay; i++) {
    arrayDay.push({
      value: i,
      label: i
    })
  }
  return arrayDay;
}

export const hiddenEmail = (email) => {
  const atIndex = email?.indexOf('@');
  if (atIndex !== -1) {
    const name = email?.substring(0, atIndex);
    const hiddenUsername = name?.slice(0, 2) + '*'.repeat(name?.length - 3);
    return hiddenUsername + email?.substring(atIndex);
  }
  return email;
}

export const hiddenPhone = (phone) => {
  const subPhone = phone?.slice(-2);

  return `****${subPhone}`
}

export const getImageCard = (brandCard) => {
  switch (brandCard) {
    case 'visa':
      return 'https://firebasestorage.googleapis.com/v0/b/pt-mall.appspot.com/o/visa-color_large.png?alt=media&token=7768a719-0e6e-485c-a8c9-d8ad27a4a9f5';
    case 'mastercard':
      return 'https://firebasestorage.googleapis.com/v0/b/pt-mall.appspot.com/o/mastercard-color_large.png?alt=media&token=43ad3ca0-4520-4059-95ef-ba24eb3f19bc';
    case 'amex':
      return 'https://firebasestorage.googleapis.com/v0/b/pt-mall.appspot.com/o/americanexpress-color-large.png?alt=media&token=7f14ef6b-275e-4bff-8de1-aeda91dc97fe';
    case 'JCB':
      return 'https://firebasestorage.googleapis.com/v0/b/pt-mall.appspot.com/o/jcb-color-large.png?alt=media&token=2cf97e8e-17ba-4b05-8a28-99f650304ee2';
    default:
      return 'https://firebasestorage.googleapis.com/v0/b/pt-mall.appspot.com/o/visa-color_large.png?alt=media&token=7768a719-0e6e-485c-a8c9-d8ad27a4a9f5';
  }
}