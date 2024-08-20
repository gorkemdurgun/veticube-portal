import { useState } from "react";

import { Button, Descriptions, Divider, Modal } from "antd";
import { DatePickerProps } from "antd/lib";
import dayjs from "dayjs";

import type { TimePickerProps } from "antd";

import { CustomDatePicker, CustomTimePicker } from "../../appointments";
import { TranslatedText } from "../../common";

type AppointmentRescheduleModalProps = {
  appointment: Appointment;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export const AppointmentRescheduleModal: React.FC<AppointmentRescheduleModalProps> = ({ appointment, visible, setVisible }) => {
  const [currentAppointment, setCurrentAppointment] = useState<Appointment>(appointment);

  const handleOk = () => {
    // setVisible(false);
    // console.log(currentAppointment);
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
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<TranslatedText tPrefix="components" tKey="modals.appointment-reschedule.title" />}
      footer={[
        <Button key="back" onClick={handleCancel}>
          <TranslatedText tPrefix="components" tKey="modals.appointment-reschedule.cancel" />
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          <TranslatedText tPrefix="components" tKey="modals.appointment-reschedule.reschedule" />
        </Button>,
      ]}
    >
      <div className="flex flex-col gap-4 py-4">
        <Descriptions
          bordered
          column={2}
          items={[
            {
              label: <TranslatedText tPrefix="components" tKey="modals.appointment-reschedule.date" />,
              children: dayjs(appointment.appointmentDate).format("DD/MM/YYYY"),
            },
            {
              label: <TranslatedText tPrefix="components" tKey="modals.appointment-reschedule.time" />,
              children: appointment.appointmentTime,
            },
          ]}
        />
        <div className="flex flex-col gap-1 bg-gray-100 p-4 rounded-lg">
          <TranslatedText className="text-sm font-semibold" tPrefix="components" tKey="modals.appointment-reschedule.quick-actions" />
          <Divider className="my-2" />
          <div className="grid grid-cols-4 gap-2">
            <Button onClick={() => addMinute(10)}>
              +10 {<TranslatedText tPrefix="components" tKey="modals.appointment-reschedule.minute" />}
            </Button>
            <Button onClick={() => addMinute(30)}>
              +30 {<TranslatedText tPrefix="components" tKey="modals.appointment-reschedule.minute" />}
            </Button>
            <Button onClick={() => addMinute(60)}>
              +1 {<TranslatedText tPrefix="components" tKey="modals.appointment-reschedule.hour" />}
            </Button>
            <Button onClick={() => addDay(1)}>+1 {<TranslatedText tPrefix="components" tKey="modals.appointment-reschedule.day" />}</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div className="flex flex-col gap-1">
            <TranslatedText className="text-sm text-gray-500" tPrefix="components" tKey="modals.appointment-reschedule.new-date" />
            <CustomDatePicker size="large" value={dayjs(currentAppointment.appointmentDate)} onChange={handleChangeDate} />
          </div>

          <div className="flex flex-col gap-1">
            <TranslatedText className="text-sm text-gray-500" tPrefix="components" tKey="modals.appointment-reschedule.new-time" />
            <CustomTimePicker size="large" value={dayjs(currentAppointment.appointmentTime, "HH:mm")} onChange={handleChangeTime} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
