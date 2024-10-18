import React, { useState } from "react";

import { PiUserPlusDuotone as AddIcon } from "react-icons/pi";

import { Form, Input, Select, Divider, message } from "antd";

import { useAppSelector } from "@/hooks";

import { ComponentCard } from "../common";
import CustomButton from "../common/custom-button";
import { mutations } from "@/services/db";
import { uiError } from "@/utils/uiError";
const { Option } = Select;

type ClientForm = {
  selectedBranch: string;
  userEmail: string;
  userFullName: string;
  userPhone?: string;
};

const AddNewClient = () => {
  const [loading, setLoading] = useState(false);
  const { assignments: branchAssignments } = useAppSelector((state) => state.user);

  const [clientForm] = Form.useForm<ClientForm>();

  const handleSubmit = () => {
    clientForm.validateFields().then((values) => {
      const { selectedBranch, userEmail, userFullName, userPhone } = values;
      mutations.clinics
        .addClientRecordToBranch(userEmail, userFullName, selectedBranch, userPhone)
        .then(() => {
          clientForm.resetFields();
          message.success("Müşteri başarıyla eklendi!");
        })
        .catch((e) => {
          message.error(uiError(e.message));
        })
        .finally(() => {
          setLoading(false);
        });
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
        <Form.Item label="Müşteri Adı Soyadı" name="userFullName" rules={[{ required: true, message: "Lütfen müşteri adı soyadı giriniz!" }]}>
          <Input placeholder="Ad soyad" />
        </Form.Item>
        <Form.Item label="Müşteri E-posta" name="userEmail" rules={[{ required: true, message: "Lütfen müşteri e-posta adresi giriniz!" }]}>
          <Input placeholder="E-posta adresi" />
        </Form.Item>
        <Form.Item label="Müşteri Telefon" name="userPhone">
          <Input placeholder="Telefon numarası (opsiyonel )" />
        </Form.Item>
        <Divider />
        <Form.Item>
          <CustomButton className="w-full" variant="secondary-faded" loading={loading} onClick={handleSubmit}>
            Müşteriyi Ekle
          </CustomButton>
        </Form.Item>
      </Form>
    </ComponentCard>
  );
};

export default AddNewClient;
