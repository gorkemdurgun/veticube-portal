import { Button, Checkbox, CheckboxProps, Descriptions, Divider, InputNumber, Modal, Select, SelectProps, TimePickerProps } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import { DatePickerProps } from "antd/lib";
import { CustomTimePicker, DebounceSelect } from "../appointments";

import { TranslatedText } from "../common";

type AppointmentCreateeModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onCreated: (appointment: Appointment) => void;
};

interface UserValue {
  label: string;
  value: string;
}

export const AppointmentCreateModal: React.FC<AppointmentCreateeModalProps> = ({ visible, setVisible, onCreated }) => {
  const [newAppointment, setNewAppointment] = useState<Appointment>();
  const [value, setValue] = useState<UserValue>();

  const handleOk = () => {
    // setVisible(false);
    console.log(newAppointment);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  async function fetchUserList(username: string): Promise<UserValue[]> {
    console.log("fetching user", username);

    return fetch("https://randomuser.me/api/?results=6")
      .then((response) => response.json())
      .then((body) =>
        body.results.map((user: { name: { first: string; last: string }; login: { username: string } }) => ({
          label: `${user.name.first} ${user.name.last}`,
          value: user.login.username,
        }))
      );
  }

  return (
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<TranslatedText tPrefix="components" tKey="modals.appointment-complete.title" />}
      footer={[
        <Button key="back" onClick={handleCancel}>
          <TranslatedText tPrefix="components" tKey="modals.appointment-complete.cancel" />
        </Button>,
        <Button key="submit" onClick={handleOk}>
          <TranslatedText tPrefix="components" tKey="modals.appointment-complete.complete" />
        </Button>,
      ]}
    >
      <div className="flex flex-col gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <DebounceSelect
            showSearch
            className="w-full"
            placeholder="Select user"
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => {
              setValue(newValue as UserValue);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
