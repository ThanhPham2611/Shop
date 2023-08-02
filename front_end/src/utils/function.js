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