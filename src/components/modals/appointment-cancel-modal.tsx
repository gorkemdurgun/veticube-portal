import { Button, Checkbox, CheckboxProps, Descriptions, Divider, Modal, Select, SelectProps, TimePickerProps } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { DatePickerProps } from "antd/lib";
import { CustomTimePicker } from "../appointments";

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
    <Modal open={visible} onOk={handleOk} onCancel={handleCancel} title="Cancel Appointment">
      <div className="flex flex-col gap-4 py-4">
        <Descriptions
          bordered
          column={2}
          items={[
            {
              label: "Pet",
              children: "Pet " + appointment.petId,
            },
            {
              label: "Owner",
              children: "Owner " + appointment.petId,
            },
            {
              label: "Type",
              children: appointment.type,
            },
            {
              label: "Veterinarian",
              children: "Vet " + appointment.veterinarianId,
            },
            {
              label: "Date",
              children: dayjs(appointment.appointmentDate).format("DD/MM/YYYY"),
            },
            {
              label: "Time",
              children: appointment.appointmentTime,
            },
          ]}
        />
        <div className="flex flex-col gap-1 bg-gray-100 p-4 rounded-lg">
          <span className="text-sm font-semibold">İptal nedeni</span>
          <Divider className="my-2" />
          <div
            className={`w-full grid grid-cols-[2fr,1fr] items-center gap-2 p-1 rounded-xl transition-all ${
              cancelOptions.isClientRequest ? "bg-green-200" : ""
            }`}
          >
            <Checkbox name="isClientRequest" checked={cancelOptions.isClientRequest} onChange={handleCheck}>
              <span className="select-none">Müşteri talebi üzerine</span>
            </Checkbox>
          </div>
          <div
            className={`w-full grid grid-cols-[2fr,1fr] items-center gap-2 p-1 rounded-xl transition-all ${
              cancelOptions.isClientNotCome ? "bg-green-200" : ""
            }`}
          >
            <Checkbox name="isClientNotCome" checked={cancelOptions.isClientNotCome} onChange={handleCheck}>
              <span className="select-none">Bildirimsiz gelmeme</span>
            </Checkbox>
          </div>
        </div>
      </div>
    </Modal>
  );
};
