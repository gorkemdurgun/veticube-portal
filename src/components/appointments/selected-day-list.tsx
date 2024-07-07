import { useAppSelector } from "@/hooks";
import { appointmentStatusSwitch, appointmentTypeSwitch } from "@/styles/switches";
import { Badge, BadgeProps, Button, Card, Divider } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  PiSyringe as VaccinationIcon,
  PiFaceMask as SurgeryIcon,
  PiCheckFat as CheckIcon,
  PiScissors as GroomingIcon,
  PiRadioButton as OtherIcon,
} from "react-icons/pi";

type SelectedDayListProps = {
  selectedDate: string;
  selectedDateAppointments: Appointment[];
};

export const SelectedDayList: React.FC<SelectedDayListProps> = ({ selectedDate, selectedDateAppointments }) => {
  const { t } = useTranslation();
  const { darkMode } = useAppSelector((state) => ({
    darkMode: state.theme.darkMode,
  }));

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

  const AppointmentItem: React.FC<{ item: Appointment }> = ({ item }) => {
    return (
      <div className={`flex flex-col items-center p-4 rounded-xl compatible-dark ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="w-full flex items-center justify-between gap-2">
          <span className="text-sm font-semibold">{item.appointmentTime}</span>
          <div
            className={`flex items-center justify-between gap-2 px-2 py-1 rounded-lg min-w-24 ${
              darkMode ? appointmentStatusSwitch[item.status].darkClassName : appointmentStatusSwitch[item.status].className
            }`}
          >
            <span className="text-xs">{t("components.appointments.selected-day-list." + item.status)}</span>
            <Badge dot color={appointmentStatusSwitch[item.status].color} status={appointmentStatusSwitch[item.status].status} />
          </div>
        </div>
        <Divider className="m-3" />
        <div className="w-full grid grid-cols-1 gap-2 p-1 rounded-sm">
          <div className="grid grid-cols-2">
            <span className="text-sm text-gray-500">Pet:</span>
            <span className="text-sm">Agro</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-sm text-gray-500">Owner:</span>
            <span className="text-sm">Loren Malosof</span>
          </div>
          <div className="grid grid-cols-2">
            <span className="text-sm text-gray-500">Type:</span>
            <span className="text-sm">{t(appointmentTypeSwitch[item.type].text)}</span>
          </div>
        </div>
        <Divider className="m-3" />
        {item.status === "scheduled" && (
          <div className="grid grid-cols-3 gap-1">
            <Button className="text-xs">Düzenle</Button>
            <Button className="text-xs">Tamamla</Button>
            <Button className="text-xs">İptal Et</Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="rounded-lg" title={title()}>
      {selectedDateAppointments.length === 0 ? (
        <p>{t("components.appointments.selected-day-list.empty")}</p>
      ) : (
        <div className="flex flex-col gap-2">
          {selectedDateAppointments.map((item) => (
            <AppointmentItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </Card>
  );
};
