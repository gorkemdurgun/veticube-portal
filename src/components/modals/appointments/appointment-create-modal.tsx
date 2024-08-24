import { useState } from "react";

import { Button, Checkbox, Descriptions, Divider, InputNumber, Modal, Select } from "antd";
import { DatePickerProps } from "antd/lib";
import dayjs from "dayjs";

import type { CheckboxProps, SelectProps, TimePickerProps } from "antd";

import { CustomTimePicker, SearchPatientInput } from "../../appointments";
import { TranslatedText } from "../../common";

type AppointmentCreateeModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onCreated: (appointment: Appointment) => void;
};

interface UserValue {
  label: string;
  value: string;
  data: {
    type: "cat" | "dog";
  };
}

export const AppointmentCreateModal: React.FC<AppointmentCreateeModalProps> = ({ visible, setVisible, onCreated }) => {
  const [newAppointment, setNewAppointment] = useState<Appointment>();
  const [value, setValue] = useState<UserValue>();

  const handleOk = () => {
    // setVisible(false);
    // console.log(newAppointment);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  async function fetchUserList(username: string): Promise<UserValue[]> {
    console.log("fetching user", username);

    return fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((body) =>
        body.map(
          (user: { id: string; name: string; email: string; username: string }) =>
            ({
              key: user.id,
              label: user.username,
              value: user.name,
              data: {
                type: Math.random() > 0.5 ? "cat" : "dog",
              },
            } as UserValue)
        )
      );
  }

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
      <div className="flex flex-col gap-4 py-4">
        <SearchPatientInput
          className="w-full"
          placeholder="Select a pet & owner"
          popupMatchSelectWidth={500}
          value={value}
          fetchOptions={fetchUserList}
          onChange={(newValue) => {
            setValue(newValue as UserValue);
          }}
        />
      </div>
    </Modal>
  );
};
