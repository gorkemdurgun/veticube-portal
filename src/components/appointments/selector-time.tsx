import { useEffect, useState } from "react";

import { TimePicker } from "antd";
import dayjs from "dayjs";

import type { TimePickerProps } from "antd";

type Props = TimePickerProps & {
  onChangeTime?: (formattedTime: string) => void;
  loading?: boolean;
};

const SelectorTime: React.FC<Props> = ({ onChangeTime, loading, ...props }) => {
  const [time, setTime] = useState<dayjs.Dayjs | undefined>(undefined);

  useEffect(() => {
    if (!time) return;
    let formattedTime = time.format("HH:mm");
    onChangeTime?.(formattedTime);
  }, [time]);

  return (
    <div className="relative">
      <TimePicker {...props} disabled={loading} format={"HH:mm"} showNow={false} minuteStep={10} value={time} onChange={setTime} />
    </div>
  );
};

export default SelectorTime;
