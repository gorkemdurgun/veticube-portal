import { Drawer, Form, Input, DatePicker, TimePicker } from "antd";

import { CustomButton } from "@/components/common";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
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
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Date" name="date" rules={[{ required: true, message: "Please select a date" }]}>
            <DatePicker className="w-full"
            showTime={{ format: 'HH:mm' }}
            />
          </Form.Item>
          
        </div>
        <CustomButton variant="primary-faded" onClick={handleCreate}>
          Create
        </CustomButton>
      </Form>
    </Drawer>
  );
};

export default CreateAppointmentDrawer;
