import { Row, Select, Space } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getDay, getMonth, getYear } from "../../utils/function";

const DateComponent = ({ date, setValueDate }) => {
  const [valueMonth, setValueMonth] = useState(moment(date).month() + 1);
  const [valueYear, setValueYear] = useState(moment(date).year());
  const [valueDay, setValueDay] = useState(moment(date).date());

  useEffect(() => {
    setValueDate(`${valueDay}/${valueMonth}/${valueYear}`)
  }, [])

  const handleChangeDay = (value) => {
    setValueDay(value);
    setValueDate(`${value}/${valueMonth}/${valueYear}`);
  }

  const handleChangeMonth = (value) => {
    setValueMonth(value);
    setValueDate(`${valueDay}/${value}/${valueYear}`);
  }

  const handleChangeYear = (value) => {
    setValueYear(value);
    setValueDate(`${valueDay}/${valueMonth}/${value}`);
  }

  return (
    <Space align='center'>
      <Select
        defaultValue={valueDay}
        style={{ width: 120 }}
        onChange={handleChangeDay}
        options={getDay(moment([valueYear, valueMonth - 1]).startOf('month').date(), moment([valueYear, valueMonth - 1]).endOf('month').date())}
      />
      <Select
        defaultValue={valueMonth}
        style={{ width: 120 }}
        onChange={handleChangeMonth}
        options={getMonth(moment()._locale._monthsShort)}
      />
      <Select
        defaultValue={valueYear}
        style={{ width: 120 }}
        onChange={handleChangeYear}
        options={getYear(moment().year())}
      />
    </Space>
  )
}

export default DateComponent;