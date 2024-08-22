import { Drawer, Form, Input, DatePicker, TimePicker, Select } from "antd";

import { SearchPatientBox } from "@/components/appointments";
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
  clinic: string;
  veterinarians: string[];
  staffs: string[];
  client: string;
};

const CreateAppointmentDrawer: React.FC<Props> = ({ visible, setVisible }) => {
  const [createForm] = Form.useForm();

  const handleCreate = () => {
    createForm.validateFields().then((values) => {
      console.log(values);
    });
  };

  return (
    <Drawer
      title="Create Appointment"
      placement="right"
      keyboard={false}
      maskClosable={false}
      width={600}
      open={visible}
      onClose={() => setVisible(false)}
    >
      <Form form={createForm} layout="vertical" onFinish={handleCreate}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <h5 className="text-sm text-gray-400 border-b border-gray-200 pb-1">Tarih ve Yer Bilgileri</h5>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 bg-gray-50 rounded-md">
              <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please select a date" }]}>
                <DatePicker className="w-full" />
              </Form.Item>
              <Form.Item label="Time" name="time" rules={[{ required: true, message: "Please select a time" }]}>
                <TimePicker className="w-full" showNow={false} format={"HH:mm"} />
              </Form.Item>
              <Form.Item className="col-span-2" label="Clinic" name="clinic" rules={[{ required: true, message: "Please enter a clinic" }]}>
                <Select showSearch options={dummyClinics} placeholder="Select a clinic" />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-sm text-gray-400 border-b border-gray-200 pb-1">İşlem Bilgileri</h5>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 bg-gray-50 rounded-md">
              <Form.Item label="Pet" name="pet" rules={[{ required: true, message: "Please select a pet" }]}>
                <SearchPatientBox />
              </Form.Item>
              <Form.Item label="Client" name="client" rules={[{ required: true, message: "Please enter a client" }]}>
                <Select
                  showSearch
                  disabled={createForm.getFieldValue("pet") === undefined}
                  options={dummyPets.map((pet) => ({ value: pet.owner }))}
                  placeholder="Select a client"
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-sm text-gray-400 border-b border-gray-200 pb-1">Katılımcılar</h5>
            <div className="grid grid-cols-1 gap-x-4 gap-y-2 p-4 bg-gray-50 rounded-md">
              <Form.Item label="Veterinarians" name="veterinarians" rules={[{ required: true, message: "Please select a veterinarian" }]}>
                <Select mode="multiple" options={dummyVeterinarians} placeholder="Select a veterinarian" />
              </Form.Item>
              <Form.Item label="Staffs" name="staffs" rules={[{ required: true, message: "Please select a staff" }]}>
                <Select mode="multiple" options={dummyStaffs} placeholder="Select a staff" />
              </Form.Item>
            </div>
          </div>
          <CustomButton variant="primary-faded" onClick={handleCreate}>
            Create
          </CustomButton>
        </div>
      </Form>
    </Drawer>
  );
};

export default CreateAppointmentDrawer;
