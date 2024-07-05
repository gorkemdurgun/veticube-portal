import { Card } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type SelectedDayListProps = {
  selectedDate: string;
  selectedDateAppointments: Appointment[];
};

export const SelectedDayList: React.FC<SelectedDayListProps> = ({ selectedDate, selectedDateAppointments }) => {
  const { t } = useTranslation();

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
      {selectedDateAppointments.length === 0 ? (
        <p>{t("components.appointments.selected-day-list.empty")}</p>
      ) : (
        <ul className="events">
          {selectedDateAppointments.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <span>{item.type}</span>
              <span>{item.status}</span>
            </div>
          ))}
        </ul>
      )}
    </Card>
  );
};
