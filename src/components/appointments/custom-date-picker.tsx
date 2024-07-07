import { DatePicker, DatePickerProps } from "antd";

import dayjs from "dayjs";

export const CustomDatePicker: React.FC<DatePickerProps> = (props) => {
  return (
    <DatePicker
      {...props}
      allowClear={false}
      needConfirm={false}
      disabledDate={(current) => current && current < dayjs().startOf("day")}
      format={"DD/MM/YYYY"}
    />
  );
};
