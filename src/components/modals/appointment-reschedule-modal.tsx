import { Button, Descriptions, Divider, Modal, TimePickerProps } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { DatePickerProps } from "antd/lib";
import { CustomDatePicker, CustomTimePicker } from "../appointments";

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

  const addMinute = (minute: number) => {
    const newTime = dayjs(currentAppointment.appointmentTime, "HH:mm").add(minute, "minute").format("HH:mm");
    setCurrentAppointment((prev) => ({ ...prev, appointmentTime: newTime }));
  };
  const addDay = (day: number) => {
    const newDate = dayjs(currentAppointment.appointmentDate).add(day, "day").format("YYYY-MM-DD");
    setCurrentAppointment((prev) => ({ ...prev, appointmentDate: newDate }));
  };

  return (
    <Modal open={visible} onOk={handleOk} onCancel={handleCancel} title="Reschedule Appointment">
      <div className="flex flex-col gap-4 py-4">
        <Descriptions
          bordered
          column={2}
          items={[
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
          <span className="text-sm font-semibold">Quick Actions</span>
          <Divider className="my-2" />
          <div className="grid grid-cols-4 gap-2">
            <Button onClick={() => addMinute(10)}>+10 min</Button>
            <Button onClick={() => addMinute(20)}>+30 min</Button>
            <Button onClick={() => addMinute(60)}>+1 hour</Button>
            <Button onClick={() => addDay(1)}>+1 day</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">New Date:</span>
            <CustomDatePicker size="large" value={dayjs(currentAppointment.appointmentDate)} onChange={handleChangeDate} />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">New Time:</span>
            <CustomTimePicker size="large" value={dayjs(currentAppointment.appointmentTime, "HH:mm")} onChange={handleChangeTime} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
