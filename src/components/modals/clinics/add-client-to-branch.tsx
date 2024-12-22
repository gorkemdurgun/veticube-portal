import { useState } from "react";

import { useMutation } from "@apollo/client";
import { Checkbox, Divider, Form, Input, message, Modal, Select } from "antd";

import { useAppSelector } from "@/hooks";
import { clinicMutations } from "@/services/apollo/mutation";

import CustomButton from "@/components/common/custom-button";

const { Option } = Select;

type Props = {
  visible: boolean;
  onClose: () => void;
  onSuccess: (skipPet: boolean, ownerId: string) => void;
};

type ClientForm = {
  selectedBranch: string;
  user: {
    email: string;
    name: string;
    phone?: string;
  };
  skipPet: boolean;
};

const AddClientToBranchModal = ({ visible, onClose, onSuccess }: Props) => {
  const [loading, setLoading] = useState(false);
  const { assignments: branchAssignments } = useAppSelector((state) => state.clinic);

  const [clientForm] = Form.useForm<ClientForm>();

  const [addMutation] = useMutation(clinicMutations.addClientToBranch);

  const handleSubmit = () => {
    clientForm.validateFields().then((values) => {
      console.log("clientForm", values);
      addMutation({
        variables: {
          branch_id: values.selectedBranch,
          email: values.user.email,
          full_name: values.user.name,
          phone_number: values.user.phone,
        },
        onCompleted: (data) => {
          message.success("Müşteri başarıyla eklendi");
          setLoading(false);
          onClose();
          onSuccess(values.skipPet, data.client.id);
        },
      });
    });
  };

  return (
    <Modal title="Müşteri Ekle" open={visible} onCancel={onClose} footer={null}>
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
        <Form.Item name={["skipPet"]} valuePropName="checked">
          <Checkbox defaultChecked={false} className="w-full p-2 text-green-600 bg-green-50 rounded-lg">
            Hızlı pet ekleme adımını atla
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <CustomButton className="w-full" variant="primary-opaque" loading={loading} onClick={handleSubmit}>
            Devam Et
          </CustomButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddClientToBranchModal;
