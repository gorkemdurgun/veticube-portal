import { Checkbox, Divider, Form, Input, InputNumber, message, Modal } from "antd";
import { TranslatedText } from "../../common";
import { useState } from "react";
import { mutations } from "@/services/db";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { createClinicRequest } from "@/redux/slices/clinicSlice";

type CreateClinicSingleModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

type ClinicFormValues = {
  name: string;
  branches: {
    name: string;
    city?: string;
    address?: string;
    phone?: string;
  }[];
};

export const CreateClinicSingleModal: React.FC<CreateClinicSingleModalProps> = ({ visible, setVisible }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.clinic);
  const [createClinicForm] = Form.useForm<ClinicFormValues>();

  const handleOk = () => {
    const clinicValues = createClinicForm.getFieldsValue();
    const branchValues = clinicValues.branches[0];

    createClinicForm.validateFields().then(() => {
      dispatch(
        createClinicRequest({
          name: clinicValues.name,
          branches: [
            {
              name: clinicValues?.name + " - (Base)",
              city: branchValues?.city,
              address: branchValues?.address,
              phone: branchValues?.phone,
            },
          ],
          onSuccess: () => {
            setVisible(false);
          },
          onError: (error) => {
            message.error({
              content: error,
              duration: 5,
            });
          },
        })
      );
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title={
        <div className="flex flex-col items-center text-center gap-2">
          <TranslatedText className="text-2xl font-semibold" tPrefix="components" tKey="modals.create-clinic-single.title" />
          <TranslatedText className="text-sm text-gray-400 font-normal" tPrefix="components" tKey="modals.create-clinic-single.subtitle" />
          <Divider className="my-2" />
        </div>
      }
    >
      <Form layout="vertical" form={createClinicForm}>
        <Form.Item
          required
          name="name"
          label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-single.form.name" />}
          rules={[{ required: true, message: "Please enter clinic name" }]}
        >
          <Input placeholder="Clinic Name" />
        </Form.Item>
        <Form.Item name={["branches", "city"]} label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-single.form.city" />}>
          <Input placeholder="City" />
        </Form.Item>
        <Form.Item
          name={["branches", "address"]}
          label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-single.form.address" />}
        >
          <Input placeholder="Address" />
        </Form.Item>
        <Form.Item name={["branches", "phone"]} label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-single.form.phone" />}>
          <Input placeholder="Phone" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
