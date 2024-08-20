
import { Card } from "antd";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { useAppSelector } from "@/hooks";

import { SelectedDayListCard } from "./selected-day-list-card";

import { TranslatedText } from "../common";

type SelectedDayListProps = {
  selectedDate: string;
  selectedDateAppointments: Appointment[];
};

export const SelectedDayList: React.FC<SelectedDayListProps> = ({ selectedDate, selectedDateAppointments }) => {
  const { t } = useTranslation();
  // const { darkMode } = useAppSelector((state) => state.theme);

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
    <>
      <Card className="rounded-lg min-w-[300px]" title={title()}>
        {selectedDateAppointments.length === 0 ? (
          <div className="text-center text-gray-500">
            <TranslatedText tPrefix="components" tKey="appointments.selected-day-list.empty" />
          </div>
        ) : (
          <div className="flex flex-col -m-6 py-4 h-auto max-h-[850px] overflow-y-scroll scrollbar-hide">
            {selectedDateAppointments.map((item, index) => (
              <SelectedDayListCard key={index} item={item} />
            ))}
          </div>
        )}
      </Card>
    </>
  );
};
