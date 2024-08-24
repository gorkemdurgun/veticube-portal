import { createRef, useState } from "react";

import { PiXCircleDuotone as CloseIcon } from "react-icons/pi";

import { Drawer, Form, Input, DatePicker, TimePicker, Select, Collapse, Divider, TimePickerProps, Skeleton } from "antd";

import { SearchPatientBox } from "@/components/appointments";
import SelectorDate from "@/components/appointments/selector-date";
import SelectorTime from "@/components/appointments/selector-time";
import { CustomButton } from "@/components/common";

import type { SelectProps } from "antd";

const dummyPets = [
  { value: "Pet 1", owner: "Owner 1" },
  { value: "Pet 2", owner: "Owner 2" },
  { value: "Pet 3", owner: "Owner 3" },
  { value: "Pet 4", owner: "Owner 4" },
  { value: "Pet 5", owner: "Owner 5" },
];
const dummyClinics: SelectProps["options"] = [
  {
    key: "clinic-1",
    value: "Clinic 1",
  },
  {
    key: "clinic-2",
    value: "Clinic 2",
  },
  {
    key: "clinic-3",
    value: "Clinic 3",
  },
  {
    key: "clinic-4",
    value: "Clinic 4",
  },
  {
    key: "clinic-5",
    value: "Clinic 5",
  },
];
const dummyVeterinarians = [
  { value: "Veterinarian 1" },
  { value: "Veterinarian 2" },
  { value: "Veterinarian 3" },
  { value: "Veterinarian 4" },
  { value: "Veterinarian 5" },
];
const dummyStaffs = [{ value: "Staff 1" }, { value: "Staff 2" }, { value: "Staff 3" }, { value: "Staff 4" }, { value: "Staff 5" }];

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};
type FormValues = {
  date: string;
  time: string;
  patient: string;
  process: string;
  client: string;
  clinic: string;
  veterinarians: string[];
  staffs: string[];
};

const CreateAppointmentDrawer: React.FC<Props> = ({ visible, setVisible }) => {
  const [createForm] = Form.useForm<FormValues>();
  const [disabledMinuteList, setDisabledMinuteList] = useState<{ hour: number; minute: number[] }[]>([]);
  const [disabledMinutesLoading, setDisabledMinutesLoading] = useState(false);

  const handleCreate = () => {
    // createForm.validateFields().then((values) => {
    console.log(createForm.getFieldsValue());
    // });
  };

  return (
    <Drawer
      placement="right"
      classNames={{
        body: "!p-0",
      }}
      closeIcon={<CloseIcon className="text-gray-700 text-2xl" />}
      title={
        <div className="flex items-center gap-2">
          <span className="text-md font-semibold">Create Appointment</span>
          <Select className="ml-auto w-1/2" showSearch options={dummyClinics} placeholder="Select a clinic" />
        </div>
      }
      keyboard={false}
      maskClosable={false}
      width={540}
      open={visible}
      onClose={() => setVisible(false)}
    >
      <Form form={createForm} layout="vertical" onFinish={handleCreate}>
        <div className="flex flex-col">
          <Collapse
            bordered={false}
            defaultActiveKey={["date"]}
            // collapsible={createForm.getFieldValue("patient") === undefined ? "disabled" : "header"}
            items={[
              {
                key: "date",
                headerClass: "text-sm !text-gray-700",
                label: "Tarih ve Zaman",
                children: (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please select a date" }]}>
                      <SelectorDate
                        className="w-full"
                        size="large"
                        disabledTimesLoading={(loading) => setDisabledMinutesLoading(loading)}
                        onDateChange={(formattedDate, getDisabledMinuteList) => {
                          createForm.setFieldsValue({ date: formattedDate, time: undefined });
                          setDisabledMinuteList(getDisabledMinuteList);
                        }}
                      />
                    </Form.Item>
                    <Form.Item label="Time" name="time" rules={[{ required: true, message: "Please select a time" }]}>
                      <SelectorTime
                        className="w-full"
                        size="large"
                        needConfirm={false}
                        loading={disabledMinutesLoading}
                        disabled={createForm.getFieldValue("date") === undefined}
                        onChangeTime={(formattedTime) => createForm.setFieldsValue({ time: formattedTime })}
                        disabledTime={(date) => {
                          return {
                            disabledMinutes(hour) {
                              const found = disabledMinuteList.find((item) => item.hour === hour);
                              return found ? found.minute : [];
                            },
                          };
                        }}
                      />
                    </Form.Item>
                  </div>
                ),
              },
            ]}
          />
          <Divider className="my-0" />
          <Collapse
            bordered={false}
            // defaultActiveKey={["patient"]}
            // collapsible={createForm.getFieldValue("date") === undefined ? "disabled" : "header"}
            items={[
              {
                key: "patient",
                headerClass: "text-sm !text-gray-700",
                label: "Hasta Bilgileri",
                children: (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <Form.Item label="Patient" name="patient" rules={[{ required: true, message: "Please select a patient" }]}>
                      <SearchPatientBox size="large" placeholder="Search patient" />
                    </Form.Item>
                    <Form.Item label="Client" name="client" rules={[{ required: true, message: "Please select a client" }]}>
                      <Select
                        size="large"
                        disabled={createForm.getFieldValue("patient") === undefined}
                        options={dummyPets}
                        placeholder="Select a owner"
                      />
                    </Form.Item>
                  </div>
                ),
              },
            ]}
          />
          <Divider className="my-0" />
          <Collapse
            bordered={false}
            // defaultActiveKey={["process"]}
            // collapsible={createForm.getFieldValue("patient") === undefined ? "disabled" : "header"}
            items={[
              {
                key: "process",
                headerClass: "text-sm !text-gray-700",
                label: "İşlem Bilgileri",
                children: (
                  <Form.Item label="Process" name="process" rules={[{ required: true, message: "Please select a process" }]}>
                    <Select options={dummyPets} placeholder="Select a process" />
                  </Form.Item>
                ),
              },
            ]}
          />
          <Divider className="my-0" />
          <Collapse
            bordered={false}
            // defaultActiveKey={["participants"]}
            // collapsible={createForm.getFieldValue("clinic") === undefined ? "disabled" : "header"}
            items={[
              {
                key: "participants",
                headerClass: "text-sm !text-gray-700",
                label: "Katılımcılar",
                children: (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <Form.Item label="Veterinarians" name="veterinarians" rules={[{ required: true, message: "Please select a veterinarian" }]}>
                      <Select mode="multiple" options={dummyVeterinarians} placeholder="Select a veterinarian" />
                    </Form.Item>
                    <Form.Item label="Staffs" name="staffs" rules={[{ required: true, message: "Please select a staff" }]}>
                      <Select mode="multiple" options={dummyStaffs} placeholder="Select a staff" />
                    </Form.Item>
                  </div>
                ),
              },
            ]}
          />
          <CustomButton className="m-4" variant="primary-faded" onClick={handleCreate}>
            Create
          </CustomButton>
        </div>
      </Form>
    </Drawer>
  );
};

export default CreateAppointmentDrawer;
