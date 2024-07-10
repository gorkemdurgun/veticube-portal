import { Button, Checkbox, CheckboxProps, Descriptions, Divider, Modal, Select, SelectProps, TimePickerProps } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { DatePickerProps } from "antd/lib";
import { CustomTimePicker } from "../appointments";
import { t } from "i18next";

type AppointmentCancelModalProps = {
  appointment: Appointment;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const AppointmentCancelModal: React.FC<AppointmentCancelModalProps> = ({ appointment, visible, setVisible }) => {
  const [currentAppointment, setCurrentAppointment] = useState<Appointment>(appointment);

  const [cancelOptions, setCancelOptions] = useState<{ [key: string]: boolean }>({
    isClientNotCome: false,
    isClientRequest: false,
  });

  const handleOk = () => {
    // setVisible(false);
    console.log(currentAppointment);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCheck: CheckboxProps["onChange"] = (e) => {
    const key = e.target.name as string;
    const value = e.target.checked;
    setCancelOptions((prev) => ({ ...prev, [key]: value }));
  };

  const optionsVet: SelectProps["options"] = [
    { label: "Vet 1", value: "1" },
    { label: "Vet 2", value: "2" },
    { label: "Vet 3", value: "3" },
  ];

  return (
    <Modal open={visible} onOk={handleOk} onCancel={handleCancel} title={t("components.modals.appointment-cancel.title")}>
      <div className="flex flex-col gap-4 py-4">
        <Descriptions
          bordered
          column={2}
          items={[
            {
              label: t("components.modals.appointment-cancel.pet"),
              children: "Pet " + appointment.petId,
            },
            {
              label: t("components.modals.appointment-cancel.owner"),
              children: "Owner " + appointment.petId,
            },
            {
              label: t("components.modals.appointment-cancel.type"),
              children: appointment.type,
            },
            {
              label: t("components.modals.appointment-cancel.vet"),
              children: "Vet " + appointment.veterinarianId,
            },
            {
              label: t("components.modals.appointment-cancel.date"),
              children: dayjs(appointment.appointmentDate).format("DD/MM/YYYY"),
            },
            {
              label: t("components.modals.appointment-cancel.time"),
              children: appointment.appointmentTime,
            },
          ]}
        />
        <div className="flex flex-col gap-1 bg-gray-100 p-4 rounded-lg">
          <span className="text-sm font-semibold">{t("components.modals.appointment-cancel.options")}</span>
          <Divider className="my-2" />
          <div
            className={`w-full grid grid-cols-[3fr,1fr] items-center gap-2 p-1 rounded-xl transition-all ${
              cancelOptions.isClientRequest ? "bg-green-200" : ""
            }`}
          >
            <Checkbox name="isClientRequest" checked={cancelOptions.isClientRequest} onChange={handleCheck}>
              <span className="select-none">{t("components.modals.appointment-cancel.options-1")}</span>
            </Checkbox>
          </div>
          <div
            className={`w-full grid grid-cols-[3fr,1fr] items-center gap-2 p-1 rounded-xl transition-all ${
              cancelOptions.isClientNotCome ? "bg-green-200" : ""
            }`}
          >
            <Checkbox name="isClientNotCome" checked={cancelOptions.isClientNotCome} onChange={handleCheck}>
              <span className="select-none">{t("components.modals.appointment-cancel.options-2")}</span>
            </Checkbox>
          </div>
        </div>
      </div>
    </Modal>
  );
};
