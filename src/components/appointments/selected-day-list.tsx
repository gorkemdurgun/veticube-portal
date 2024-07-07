import { useAppSelector } from "@/hooks";
import { appointmentStatusSwitch, appointmentTypeSwitch } from "@/styles/switches";
import { Badge, BadgeProps, Button, Card, Divider } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PiPencil as EditIcon, PiCheck as CompleteIcon, PiX as CancelIcon } from "react-icons/pi";
import { AppointmentEditModal } from "@/components/modals";

type SelectedDayListProps = {
  selectedDate: string;
  selectedDateAppointments: Appointment[];
};

export const SelectedDayList: React.FC<SelectedDayListProps> = ({ selectedDate, selectedDateAppointments }) => {
  const { t } = useTranslation();
  const { darkMode } = useAppSelector((state) => state.theme);

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
    const [editModalVisible, setEditModalVisible] = useState(false);

    return (
      <>
        <AppointmentEditModal appointment={item} visible={editModalVisible} setVisible={setEditModalVisible} />
        <div className={`flex flex-col items-center p-4 mx-4 my-1 rounded-xl compatible-dark ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
          <div className="w-full flex items-center justify-between gap-2">
            <span className="text-sm font-semibold">{item.appointmentTime}</span>
            <div
              className={`flex items-center justify-between gap-2 px-2 py-1 rounded-lg min-w-32 ${
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
              <span className="text-sm">Loko</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-sm text-gray-500">Sahip:</span>
              <span className="text-sm">Sarah Polos</span>
            </div>
            <div className="grid grid-cols-2">
              <span className="text-sm text-gray-500">İşlem:</span>
              <span className="text-sm">{t(appointmentTypeSwitch[item.type].text)}</span>
            </div>
          </div>
          <Divider className="m-3" />
          {item.status === "scheduled" && (
            <div className="flex gap-1">
              <Button className="p-2 text-semibold" onClick={() => setEditModalVisible(true)}>
                Edit
              </Button>
              <Button className="p-2">
                Complete
              </Button>
              <Button 
              className="p-2">
                Cancel
              </Button>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <>
      <Card className="rounded-lg min-w-[300px]" title={title()}>
        {selectedDateAppointments.length === 0 ? (
          <div className="text-center text-gray-500">
            <span>{t("components.appointments.selected-day-list.empty")}</span>
          </div>
        ) : (
          <div className="flex flex-col -m-6 py-4 h-auto max-h-[800px] overflow-y-scroll ">
            {selectedDateAppointments.map((item, index) => (
              <AppointmentItem key={index} item={item} />
            ))}
          </div>
        )}
      </Card>
    </>
  );
};
