import React, { useState } from "react";

import { PiScanDuotone as ScanIcon } from "react-icons/pi";

import { Form, Input, Button, Select } from "antd";

import { ComponentCard } from "../common";
import EmailInput from "../common/email-input";

const { Option } = Select;

const AddNewPatient = () => {
  const [loading, setLoading] = useState(false);
  const [isClientExist, setIsClientExist] = useState(false);

  const [addForm] = Form.useForm<{
    client: {
      email: string;
    };
    patient: {
      name: string;
      species: string;
      breed: string;
      color: string;
      birthdate: string;
    };
  }>();

  return (
    <ComponentCard title="Hasta Kaydı Oluştur">
      <Form
        form={addForm}
        name="add-patient-form"
        layout="vertical"
        onFinish={async (values) => {
          setLoading(true);
          console.log(values);
          setLoading(false);
        }}
      >
        <Form.Item label="Name" name={["client", "email"]} rules={[{ required: true, message: "Please input the name!" }]}>
          <EmailInput
            scannable
            inputClassName="max-w-[280px]"
            value={addForm.getFieldValue("email")}
            onChange={(value) => addForm.setFieldsValue({ client: { email: value } })}
          />
        </Form.Item>
        {!isClientExist && (
          <>
            <Form.Item label="Species" name={["patient", "species"]} rules={[{ required: true, message: "Please input the species!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Breed" name={["patient", "breed"]} rules={[{ required: true, message: "Please input the breed!" }]}>
              <Input />
            </Form.Item>
          </>
        )}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Patient
          </Button>
        </Form.Item>
      </Form>
    </ComponentCard>
  );
};

export default AddNewPatient;
