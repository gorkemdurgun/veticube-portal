import { DatePicker } from "antd";
import dayjs from "dayjs";

import type { DatePickerProps } from "antd";

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
