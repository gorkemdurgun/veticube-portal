import React, { useState } from "react";

import { PiScanDuotone as ScanIcon } from "react-icons/pi";

import { Form, Input, Select, Divider } from "antd";

import { ComponentCard } from "../common";
import CustomButton from "../common/custom-button";
import EmailInput from "../common/email-input";
import UserSearchInput from "../common/user-search-input";

const { Option } = Select;

const AddNewPatient = () => {
  const [loading, setLoading] = useState(false);
  const [isClientExist, setIsClientExist] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [addForm] = Form.useForm<{
    client: {
      email: string;
      fullName: string;
      phoneNumber?: string;
    };
    patient: {
      name: string;
      species: string;
      breed: string;
    };
  }>();

  return (
    <ComponentCard title="Hasta Kaydı Oluştur">
      <Form
        form={addForm}
        name="add-patient-form"
        layout="vertical"
        className="flex flex-col gap-4"
        onFinish={async (values) => {
          setLoading(true);
          console.log(values);
          setLoading(false);
        }}
      >
        <div className="flex flex-col">
          <h5 className="text-lg font-semibold">Müşteri Bilgileri</h5>
          <Divider className="my-3" />
          <UserSearchInput 
          inputClassName="min-w-[300px]"
          onSelectUserId={(userId) => setSelectedUserId(userId)} />
          <h6 className="text-sm text-gray-500 mt-2">{selectedUserId}</h6>
          {/* <Form.Item label="Ad Soyad" name={["client", "fullName"]} rules={[{ required: true, message: "Please input the name!" }]}>
            <Input placeholder="Müşteri adını girin" />
          </Form.Item>
          <Form.Item label="Email Adresi" name={["client", "email"]} rules={[{ required: true, message: "Please input the email!" }]}>
            <EmailInput
              value={addForm.getFieldValue(["client", "email"])}
              onChange={(value) => addForm.setFieldsValue({ client: { email: value } })}
            />
          </Form.Item> */}
          {/* <Form.Item label="Telefon Numarası" name={["client", "phoneNumber"]}>
            <Input placeholder="Müşteri telefon numarasını girin" />
          </Form.Item> */}
        </div>
        <Form.Item>
          <CustomButton className="mt-4" variant="primary-opaque" loading={loading}>
            Add Patient
          </CustomButton>
        </Form.Item>
      </Form>
    </ComponentCard>
  );
};

export default AddNewPatient;
