import { Button, Checkbox, CheckboxProps, Descriptions, Modal, Select, SelectProps, TimePickerProps } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { DatePickerProps } from "antd/lib";
import { CustomTimePicker } from "../appointments";

type AppointmentCompleteModalProps = {
  appointment: Appointment;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const AppointmentCompleteModal: React.FC<AppointmentCompleteModalProps> = ({ appointment, visible, setVisible }) => {
  const [currentAppointment, setCurrentAppointment] = useState<Appointment>(appointment);

  const [isTimeDifferent, setIsTimeDifferent] = useState(false);
  const [isVetDifferent, setIsVetDifferent] = useState(false);

  const handleOk = () => {
    // setVisible(false);
    console.log(currentAppointment);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCheckTime: CheckboxProps["onChange"] = (e) => {
    setIsTimeDifferent(e.target.checked);
  };
  const handleChangeTime: TimePickerProps["onChange"] = (time, timeString) => {
    const newTime = dayjs(time).format("HH:mm");
    setCurrentAppointment((prev) => ({ ...prev, appointmentTime: newTime }));
  };

  const handleCheckVet: CheckboxProps["onChange"] = (e) => {
    setIsVetDifferent(e.target.checked);
  };

  const optionsVet: SelectProps["options"] = [
    { label: "Vet 1", value: "1" },
    { label: "Vet 2", value: "2" },
    { label: "Vet 3", value: "3" },
  ];

  return (
    <Modal open={visible} onOk={handleOk} onCancel={handleCancel} title="Complete Appointment">
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
        <div className="flex flex-col gap-2">
          <div className="w-full grid grid-cols-[2fr,1fr] items-center gap-2">
            <Checkbox checked={isTimeDifferent} onChange={handleCheckTime}>
              Pet sahibi farklı bir zamanda geldi
            </Checkbox>
            <CustomTimePicker
              disabled={!isTimeDifferent}
              className="w-full"
              defaultValue={dayjs(appointment.appointmentTime, "HH:mm")}
              onChange={handleChangeTime}
            />
          </div>
          <div className="w-full grid grid-cols-[2fr,1fr] items-center gap-2">
            <Checkbox checked={isVetDifferent} onChange={handleCheckVet}>
              İşlemi yapan farklı bir veterinerdi
            </Checkbox>
            <Select disabled={!isVetDifferent} className="w-full" defaultValue={appointment.veterinarianId} options={optionsVet} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
