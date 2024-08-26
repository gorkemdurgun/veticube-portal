import { useEffect, useState } from "react";

import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";

import { useCustomAppQuery } from "@/hooks";
import { queries } from "@/services/db";
import type { GetSelectedDateReservationsResponse } from "@/services/db/queries/clinic";

import type { DatePickerProps } from "antd";

type Props = DatePickerProps & {
  onDateChange: (formattedDate: string, getDisabledMinuteList: { hour: number; minute: number[] }[]) => void;
};

const SelectorDate: React.FC<Props> = ({ onDateChange, ...props }) => {
  const [date, setDate] = useState<dayjs.Dayjs | undefined>(undefined);
  const { data, loading, refetch } = useCustomAppQuery({
    query: queries.clinic.GetSelectedDateReservations,
    options: {
      skip: !date,
      variables: { selectedDate: date?.format("YYYY-MM-DD") },
    },
  });

  // Zamanı parse et ve dakikaları ayır
  const parseMinutes = (reservations?: GetSelectedDateReservationsResponse["reservations"]): { hour: number; minute: number[] }[] => {
    if (!reservations) return [];

    const parsed = reservations.map((reservation) => {
      // `appointment_time` değerini saat ve dakika olarak ayır
      const time = reservation.appointment_time.split("+")[0]; // "12:00:00+03" => "12:00:00"
      const [hour, minute] = time.split(":").map(Number); // "12:00:00" => [12, 0]
      return { hour, minute };
    });

    const result = parsed.reduce((acc, curr) => {
      const found = acc.find((item) => item.hour === curr.hour);

      if (found) {
        found.minute.push(curr.minute);
      } else {
        acc.push({ hour: curr.hour, minute: [curr.minute] });
      }

      return acc;
    }, [] as { hour: number; minute: number[] }[]);

    console.log(result);
    return result;
  };

  // firstlye parse minutes, after incoming

  useEffect(() => {
    if (!date) return;
    refetch().then(({ data }) => {
      const formattedDate = date?.format("YYYY-MM-DD") ?? "";
      const formattedDisabledMinutes = parseMinutes(data?.reservations);
      onDateChange(formattedDate, formattedDisabledMinutes);
    });
  }, [date]);

  return (
    <DatePicker
      {...props}
      disabledDate={(current) => current && current < dayjs().startOf("day")}
      allowClear={false}
      value={date}
      onChange={setDate}
    />
  );
};

export default SelectorDate;
