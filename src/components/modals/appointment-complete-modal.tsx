import { Button, Checkbox, CheckboxProps, Descriptions, Divider, InputNumber, Modal, Select, SelectProps, TimePickerProps } from "antd";
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

  const [payAmount, setPayAmount] = useState<number>(0);
  const [completeOptions, setCompleteOptions] = useState<{ [key: string]: boolean }>({
    isTimeDifferent: false,
    isVetDifferent: false,
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
    setCompleteOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleChangeTime: TimePickerProps["onChange"] = (time, timeString) => {
    const newTime = dayjs(time).format("HH:mm");
    setCurrentAppointment((prev) => ({ ...prev, appointmentTime: newTime }));
  };

  const payRestrictions = payAmount.toString().includes(".") || payAmount.toString().includes("-") || payAmount < 0;
  const handleChangeAmount = (value: number | null) => {
    setPayAmount(value || 0);
  };

  const optionsVet: SelectProps["options"] = [
    { label: "Vet 1", value: "1" },
    { label: "Vet 2", value: "2" },
    { label: "Vet 3", value: "3" },
  ];

  return (
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title="Complete Appointment"
      footer={[
        <Button key="back" onClick={handleCancel}>
          İptal
        </Button>,
        <Button key="submit" disabled={payRestrictions} onClick={handleOk}>
          Tamamla
        </Button>,
      ]}
    >
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
          <span className="text-sm font-semibold">İşlem seçenekleri</span>
          <Divider className="my-2" />
          <div
            className={`w-full grid grid-cols-[2fr,1fr] items-center gap-2 p-1 rounded-xl transition-all ${
              completeOptions.isTimeDifferent ? "bg-green-200" : ""
            }`}
          >
            <Checkbox name="isTimeDifferent" checked={completeOptions.isTimeDifferent} onChange={handleCheck}>
              Randevu farklı bir saatte yapıldı
            </Checkbox>
            <CustomTimePicker
              disabled={!completeOptions.isTimeDifferent}
              className="w-full"
              defaultValue={dayjs(appointment.appointmentTime, "HH:mm")}
              onChange={handleChangeTime}
            />
          </div>
          <div
            className={`w-full grid grid-cols-[2fr,1fr] items-center gap-2 p-1 rounded-xl transition-all ${
              completeOptions.isVetDifferent ? "bg-green-200" : ""
            }`}
          >
            <Checkbox name="isVetDifferent" checked={completeOptions.isVetDifferent} onChange={handleCheck}>
              İşlemi farklı bir veteriner yaptı
            </Checkbox>
            <Select
              disabled={!completeOptions.isVetDifferent}
              className="w-full"
              defaultValue={appointment.veterinarianId}
              options={optionsVet}
            />
          </div>
        </div>
        <Divider className="my-2" />
        <div className="w-full grid grid-cols-2 items-center p-2 rounded-lg bg-gray-100">
          <span className="text-md">Ödeme miktarı:</span>
          <InputNumber
            className="w-full"
            addonAfter="₺"
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            status={payRestrictions ? "error" : undefined}
            value={payAmount}
            onChange={handleChangeAmount}
          />
        </div>
      </div>
    </Modal>
  );
};
