import { Button, DatePicker, Modal, TimePicker, TimePickerProps } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { DatePickerProps } from "antd/lib";

type AppointmentRescheduleModalProps = {
  appointment: Appointment;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const AppointmentRescheduleModal: React.FC<AppointmentRescheduleModalProps> = ({ appointment, visible, setVisible }) => {
  const [currentAppointment, setCurrentAppointment] = useState<Appointment>(appointment);

  const handleOk = () => {
    // setVisible(false);
    console.log(currentAppointment);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    const newDate = dayjs(date).format("YYYY-MM-DD");
    setCurrentAppointment((prev) => ({ ...prev, appointmentDate: newDate }));
  };

  const handleChangeTime: TimePickerProps["onChange"] = (time, timeString) => {
    const newTime = dayjs(time).format("HH:mm");
    setCurrentAppointment((prev) => ({ ...prev, appointmentTime: newTime }));
  };

  return (
    <Modal open={visible} onOk={handleOk} onCancel={handleCancel} title="Edit Appointment">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Current Date:</span>
            <DatePicker disabled format={"DD/MM/YYYY"} value={dayjs(appointment.appointmentDate)} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">New Date:</span>
            <DatePicker
              allowClear={false}
              needConfirm
              // past dates are disabled
              disabledDate={(current) => current && current < dayjs().startOf("day")}
              format={"DD/MM/YYYY"}
              value={dayjs(currentAppointment.appointmentDate)}
              onChange={handleChangeDate}
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">Current Time:</span>
            <TimePicker disabled format={"HH:mm"} value={dayjs(appointment.appointmentTime, "HH:mm")} />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">New Time:</span>
            <TimePicker
              allowClear={false}
              showNow={false}
              needConfirm
              format={"HH:mm"}
              value={dayjs(currentAppointment.appointmentTime, "HH:mm")}
              onChange={handleChangeTime}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
