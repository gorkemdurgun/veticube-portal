import { useAppSelector } from "@/hooks";

import { Badge, BadgeProps, Button, Card, Divider, Dropdown } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PiPencilSimple as EditIcon, PiCheck as CompleteIcon, PiX as CancelIcon } from "react-icons/pi";
import { AppointmentRescheduleModal } from "@/components/modals";

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

const appointmentTypeSwitch: {
  [key: string]: {
    className: string;
    darkClassName: string;
    icon: JSX.Element;
    text: string;
  };
} = {
  check: {
    className: "text-lime-800 bg-gray-100",
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
const appointmentStatusSwitch: {
  [key: string]: {
    className: string;
    darkClassName: string;
    status: BadgeProps["status"];
    color: BadgeProps["color"];
  };
} = {
  scheduled: {
    className: "text-blue-500 bg-blue-100",
    darkClassName: "text-blue-300 bg-blue-800",
    status: "processing",
    color: "blue",
  },
  rescheduled: {
    className: "text-blue-500 bg-blue-100",
    darkClassName: "text-blue-300 bg-blue-800",
    status: "processing",
    color: "blue",
  },
  completed: {
    className: "text-green-500 bg-green-100",
    darkClassName: "text-green-300 bg-green-800",
    status: "success",
    color: "green",
  },
  cancelled: {
    className: "text-red-500 bg-red-100",
    darkClassName: "text-red-300 bg-red-800",
    status: "error",
    color: "red",
  },
  default: {
    className: "text-gray-500 bg-gray-200",
    darkClassName: "text-gray-300 bg-gray-800",
    status: "default",
    color: "gray",
  },
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

    const statusSwitch = appointmentStatusSwitch[item.status];
    const typeSwitch = appointmentTypeSwitch[item.type];
    return (
      <>
        <AppointmentRescheduleModal appointment={item} visible={editModalVisible} setVisible={setEditModalVisible} />
        <div className={`flex flex-col items-center p-4 mx-4 my-1 rounded-xl compatible-dark ${darkMode ? "bg-gray-600/20" : "bg-gray-50"}`}>
          <div className="w-full flex items-center justify-between gap-2">
            <span className="text-sm font-[500]">{item.appointmentTime}</span>
            <div
              className={`flex items-center justify-between gap-2 px-2 py-1 rounded-lg min-w-32 ${
                darkMode ? statusSwitch.darkClassName : statusSwitch.className
              }`}
            >
              <span className="text-xs">{t("components.appointments.selected-day-list." + item.status)}</span>
              <Badge dot color={statusSwitch.color} status={statusSwitch.status} />
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
              <span className="text-sm">{t(typeSwitch.text)}</span>
            </div>
          </div>
          <Divider className="m-3" />
          {(item.status === "scheduled" || item.status === "rescheduled") && (
            <div className="w-full grid grid-cols-2 gap-2">
              <Button className="w-full p-2">View</Button>
              <Dropdown
                menu={{
                  items: [
                    { key: "reschedule", label: "Reschedule", icon: <EditIcon />, onClick: () => setEditModalVisible(true) },
                    { key: "complete", label: "Complete", icon: <CompleteIcon /> },
                    { key: "cancel", label: "Cancel", icon: <CancelIcon /> },
                  ],
                }}
              >
                <Button className="w-full p-2">Actions</Button>
              </Dropdown>
            </div>
          )}
          {(item.status === "completed" || item.status === "cancelled") && (
            <div className="w-full grid grid-cols-2 gap-2">
              <Button className="w-full p-2">View</Button>
              <Button className="w-full p-2">Actions</Button>
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
          <div className="flex flex-col -m-6 py-4 h-auto max-h-[800px] overflow-y-scroll scrollbar-hide">
            {selectedDateAppointments.map((item, index) => (
              <AppointmentItem key={index} item={item} />
            ))}
          </div>
        )}
      </Card>
    </>
  );
};
