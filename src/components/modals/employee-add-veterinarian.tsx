import { Button, Checkbox, CheckboxProps, Descriptions, Divider, InputNumber, Modal, Select, SelectProps, TimePickerProps } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { DatePickerProps } from "antd/lib";
import { CustomTimePicker, SearchPatientBox } from "../appointments";

import { TranslatedText } from "../common";

type EmployeeAddVeterinarianProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onCreated: (appointment: Appointment) => void;
};

export const EmployeeAddVeterinarianModal: React.FC<EmployeeAddVeterinarianProps> = ({ visible, setVisible, onCreated }) => {
  const [newAppointment, setNewAppointment] = useState<Appointment>();

  const handleOk = () => {
    // setVisible(false);
    console.log(newAppointment);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<TranslatedText tPrefix="components" tKey="modals.appointment-create.title" />}
      footer={[
        <Button key="back" onClick={handleCancel}>
          <TranslatedText tPrefix="components" tKey="modals.appointment-complete.cancel" />
        </Button>,
        <Button key="submit" onClick={handleOk}>
          <TranslatedText tPrefix="components" tKey="modals.appointment-complete.complete" />
        </Button>,
      ]}
    >
      <div className="flex flex-col gap-4 py-4"></div>
    </Modal>
  );
};
