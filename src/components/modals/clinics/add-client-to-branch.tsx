import { useState } from "react";

import { Card, Checkbox, Divider, Form, Input, message, Modal, Select, Steps } from "antd";

import { useAppSelector } from "@/hooks";
import { mutations } from "@/services/db";
import { uiError } from "@/utils/uiError";

import CustomButton from "@/components/common/custom-button";

const { Option } = Select;

type Props = {
  visible: boolean;
  onClose: () => void;
};

type ClientForm = {
  selectedBranch: string;
  user: {
    email: string;
    fullName: string;
    phone?: string;
  };
};

const AddClientToBranchModal = ({ visible, onClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const { assignments: branchAssignments } = useAppSelector((state) => state.user);

  const [clientForm] = Form.useForm<ClientForm>();

  const handleSubmit = () => {
    clientForm.validateFields().then((values) => {
      console.log("values", values);
    });
  };

  return (
    <Modal title="Müşteri Ekle" open={visible} onOk={onClose} onCancel={onClose} footer={null}>
      <Form form={clientForm} layout="vertical" initialValues={{ selectedBranch: branchAssignments[0].branch.id }}>
        <Form.Item label="Eklenecek Şube" name="selectedBranch" rules={[{ required: true, message: "Lütfen bir şube seçiniz!" }]}>
          <Select disabled={branchAssignments.length < 2} placeholder="Şube seçiniz">
            {branchAssignments.map((assignment) => (
              <Option key={assignment.branch.id} value={assignment.branch.id}>
                {assignment.branch.branch_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Divider />
        <Form.Item
          label="Müşteri Adı Soyadı"
          name={["user", "name"]}
          rules={[{ required: true, message: "Lütfen müşteri adı soyadı giriniz!" }]}
        >
          <Input placeholder="Ad soyad" />
        </Form.Item>
        <Form.Item
          label="Müşteri E-posta"
          name={["user", "email"]}
          rules={[{ required: true, message: "Lütfen müşteri e-posta adresi giriniz!" }]}
        >
          <Input placeholder="E-posta adresi" />
        </Form.Item>
        <Form.Item label="Müşteri Telefon" name={["user", "phone"]}>
          <Input placeholder="Telefon numarası (opsiyonel )" />
        </Form.Item>
        <Divider />
        <Form.Item>
          <CustomButton className="w-full" variant="secondary-faded" loading={loading} onClick={handleSubmit}>
            Devam Et
          </CustomButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddClientToBranchModal;
