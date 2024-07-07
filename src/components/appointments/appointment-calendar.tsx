import { useAppSelector } from "@/hooks";
import { Badge, Calendar, CalendarProps, Statistic, StatisticProps } from "antd";
import { BadgeProps } from "antd/lib";
import dayjs, { Dayjs } from "dayjs";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";
import {
  PiSyringe as VaccinationIcon,
  PiFaceMask as SurgeryIcon,
  PiCheckFat as CheckIcon,
  PiScissors as GroomingIcon,
  PiRadioButton as OtherIcon,
} from "react-icons/pi";

type AppointmentCalendarProps = {
  appointments: Appointment[];
  onSelectDate: (date: string) => void;
};

const appointmentTypeSwitch: {
  [key: string]: {
    className: string;
    darkClassName: string;
    icon: JSX.Element;
    text: string;
  };
} = {
  check: {
    className: "text-lime-800 bg-gray-100 group-hover:bg-gray-200",
    darkClassName: "text-lime-100 bg-gray-600/20",
    icon: <CheckIcon />,
    text: "global.appointments.types.check",
  },
  surgery: {
    className: "text-rose-800 bg-gray-100",
    darkClassName: "text-rose-100 bg-gray-600/20",
    icon: <SurgeryIcon />,
    text: "global.appointments.types.surgery",
  },
  vaccination: {
    className: "text-orange-800 bg-gray-100",
    darkClassName: "text-orange-100 bg-gray-600/20",
    icon: <VaccinationIcon />,
    text: "global.appointments.types.vaccination",
  },
  grooming: {
    className: "text-indigo-800 bg-gray-100",
    darkClassName: "text-indigo-100 bg-gray-600/20",
    icon: <GroomingIcon />,
    text: "global.appointments.types.grooming",
  },
  other: {
    className: "text-sky-800 bg-gray-100",
    darkClassName: "text-sky-100 bg-gray-600/20",
    icon: <OtherIcon />,
    text: "global.appointments.types.other",
  },
};

const EventItem: React.FC<{ type: AppointmentType; time: string }> = ({ type, time }) => {
  const { darkMode } = useAppSelector((state) => state.theme);

  const typeSwitch = appointmentTypeSwitch[type];

  return (
    <div
      className={`flex items-center justify-between gap-1 p-1 rounded-xl
    compatible-dark ${darkMode ? typeSwitch.darkClassName : typeSwitch.className}
   `}
    >
      {typeSwitch.icon}
      <span className="text-xs">{time}</span>
      {/* <span className="capitalize text-xs">{t(itemMap[type].text)}</span> */}
    </div>
  );
};

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ appointments, onSelectDate }) => {
  const getListData = (value: Dayjs) => {
    let listData: { type: AppointmentType; time: string }[] = [];
    const events = appointments.filter((appointment) => value.isSame(dayjs(appointment.appointmentDate), "day"));
    events.forEach((event) => {
      listData.push({ type: event.type, time: event.appointmentTime });
    });
    return listData || [];
  };
  const getMonthData = (value: Dayjs) => {
    return true;
  };
  const monthCellRender = (value: Dayjs) => {
    const formatter: StatisticProps["formatter"] = (value) => <CountUp delay={0.5} end={value as number} />;

    const num = getMonthData(value);
    const isCurrentMonth = dayjs().month() === value.month();

    return num ? (
      <div className="grid grid-cols-2">
        <Statistic title="Tamamlanan" value={15} formatter={isCurrentMonth ? formatter : undefined} />
        <Statistic title="İptal Edilen" value={5} formatter={isCurrentMonth ? formatter : undefined} />
      </div>
    ) : null;
  };
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="grid gap-1 pb-2 ">
        {listData.map((item, index) => (
          <EventItem key={index} type={item.type} time={item.time} />
        ))}
      </ul>
    );
  };
  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  const validRange: CalendarProps<Dayjs>["validRange"] = [dayjs().subtract(1, "year"), dayjs().add(1, "year")];

  return (
    <Calendar
      style={{ scrollbarWidth: "thin" }}
      validRange={validRange}
      cellRender={cellRender}
      onSelect={(value) => onSelectDate(value.format("DD/MM/YYYY"))}
    />
  );
};
