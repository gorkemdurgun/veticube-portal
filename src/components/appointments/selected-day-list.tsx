import { Card } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type SelectedDayListProps = {
  selectedDate: string;
};

export const SelectedDayList: React.FC<SelectedDayListProps> = ({ selectedDate }) => {
  const { t } = useTranslation();

  const [listData, setListData] = useState<string[]>([]);

  let title = () => {
    switch (selectedDate) {
      case dayjs().subtract(1, "day").format("DD/MM/YYYY"):
        return t("components.appointments.selected-day-list.yesterday");
      case dayjs().format("DD/MM/YYYY"):
        return t("components.appointments.selected-day-list.today");
      case dayjs().add(1, "day").format("DD/MM/YYYY"):
        return t("components.appointments.selected-day-list.tomorrow");
      default:
        return selectedDate;
    }
  };

  return (
    <Card className="rounded-lg" title={title()}>
        {listData.length === 0 ? (
            <p>{t("components.appointments.selected-day-list.empty")}</p>
        ) : (
            <ul className="events">
            {listData.map((item) => (
                <span key={item}>{item}</span>
            ))}
            </ul>
        )}
    </Card>
  );
};
