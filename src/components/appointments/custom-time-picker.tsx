import { TimePicker, TimePickerProps } from "antd";

export const CustomTimePicker: React.FC<TimePickerProps> = (props) => {
  return (
    <TimePicker
      {...props}
      allowClear={false}
      needConfirm={false}
      showNow={false}
      hideDisabledOptions={true}
      format={"HH:mm"}
      disabledTime={(current) => {
        const excludingTenMinutes = Array.from({ length: 60 })
          .map((_, i) => i)
          .filter((i) => i % 10 !== 0);
        return {
          disabledMinutes: () => excludingTenMinutes,
        };
      }}
    />
  );
};
