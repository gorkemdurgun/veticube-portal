import React, { useState } from "react";

import { PiUserPlusDuotone as AddIcon } from "react-icons/pi";

import { Form, Input, Select, Divider } from "antd";

import { useAppSelector } from "@/hooks";

import { ComponentCard } from "../common";
import CustomButton from "../common/custom-button";
const { Option } = Select;

type ClientForm = {
  selectedBranch: string;
};

const AddNewClient = () => {
  const [loading, setLoading] = useState(false);
  const { assignments: branchAssignments } = useAppSelector((state) => state.user);

  const [clientForm] = Form.useForm<ClientForm>();

  const handleSubmit = () => {
    clientForm.validateFields().then((values) => {
      console.log("values", values);
    });
  };

  return (
    <ComponentCard title="Müşteri Ekle" extra={<AddIcon className="text-2xl text-green-600" />}>
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
        <Form.Item>
          <CustomButton variant="secondary-faded" loading={loading} onClick={handleSubmit}>
            Ekle
          </CustomButton>
        </Form.Item>
      </Form>
    </ComponentCard>
  );
};

export default AddNewClient;
