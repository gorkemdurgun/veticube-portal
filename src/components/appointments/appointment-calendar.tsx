import { Badge, Calendar, CalendarProps } from "antd";
import { BadgeProps } from "antd/lib";
import dayjs, { Dayjs } from "dayjs";

type SelectedDayListProps = {
  onSelectDate: (date: string) => void;
};

export const AppointmentCalendar: React.FC<SelectedDayListProps> = ({ onSelectDate }) => {
  const getListData = (value: Dayjs) => {
    let listData: { type: string; content: string }[] = []; // Specify the type of listData
    switch (value.date()) {
      case 3:
        listData = [
          { type: "error", content: "Surgery" },
          { type: "success", content: "Check" },
        ];
        break;
      case 10:
        listData = [
          { type: "error", content: "Surgery" },
          { type: "success", content: "Check" },
        ];
        break;
      case 15:
        listData = [
          { type: "warning", content: "Vaccine" },
          { type: "warning", content: "Vaccine" },
          { type: "success", content: "Check" },
        ];
        break;
      default:
    }
    return listData || [];
  };
  const getMonthData = (value: Dayjs) => {
    if (value.month() === 8) {
      return 1394;
    }
  };
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps["status"]} text={item.content} />
          </li>
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

  return <Calendar validRange={validRange} cellRender={cellRender} onSelect={(value) => onSelectDate(value.format("DD/MM/YYYY"))} />;
};
