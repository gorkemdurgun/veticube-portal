import { useState } from "react";

import { Checkbox, Divider, Form, Input, InputNumber, Modal } from "antd";

import { useAppDispatch } from "@/hooks";
import { createClinicRequest } from "@/redux/slices/clinic/clinicSlice";
import { mutations } from "@/services/db";

import { TranslatedText } from "../../common";

type CreateClinicMultipleModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

type ClinicFormValues = {
  name: string;
};
type BranchFormValues = {
  branch: {
    name: string;
    city: string;
    address: string;
    phone: string;
  }[];
};

export const CreateClinicMultipleModal: React.FC<CreateClinicMultipleModalProps> = ({ visible, setVisible }) => {
  const dispatch = useAppDispatch();
  const [createClinicForm] = Form.useForm<ClinicFormValues>();
  const [createBranchForm] = Form.useForm<BranchFormValues>();
  const [branchCount, setBranchCount] = useState<number | null>(1);

  const handleOk = () => {
    const clinicValues = createClinicForm.getFieldsValue();
    const branchValues = createBranchForm.getFieldsValue();

    // console.log(clinicValues, branchValues);

    dispatch(
      createClinicRequest({
        name: clinicValues.name,
        branches: branchValues.branch.map((branch) => ({
          name: branch.name,
          city: branch.city,
          address: branch.address,
          phone: branch.phone,
        })),
        onSuccess: () => {
          setVisible(false);
        },
      })
    );
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<TranslatedText tPrefix="components" tKey="modals.create-clinic-multiple.title" />}
    >
      <Form layout="vertical" form={createClinicForm}>
        <Form.Item
          required
          name="name"
          label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-multiple.form.name" />}
          rules={[{ required: true, message: "Please enter clinic name" }]}
        >
          <Input placeholder="Clinic Name" />
        </Form.Item>
        <InputNumber
          className="w-full"
          defaultValue={1}
          min={1}
          max={5}
          addonBefore={<TranslatedText tPrefix="components" tKey="modals.create-clinic-multiple.branch-count" />}
          value={branchCount}
          onChange={(value) => setBranchCount(value)}
        />
      </Form>
      <Divider className="my-2" />
      <Form layout="vertical" form={createBranchForm}>
        {[...Array(branchCount)].map((_, index) => (
          <div key={index} className="grid grid-cols-1 gap-2 p-2 my-2 bg-gray-100 rounded-md">
            <h1 className="text-lg font-semibold">{index + 1}.</h1>
            <Divider className="my-1" />
            <Form.Item
              required
              name={["branch", index, "name"]}
              label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-multiple.form.branch-name" />}
              rules={[{ required: true, message: "Please enter branch name" }]}
            >
              <Input placeholder="Branch Name" />
            </Form.Item>
            <Form.Item
              name={["branch", index, "city"]}
              label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-multiple.form.city" />}
              rules={[{ message: "Please enter city" }]}
            >
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item
              name={["branch", index, "address"]}
              label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-multiple.form.address" />}
              rules={[{ message: "Please enter address" }]}
            >
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item
              name={["branch", index, "phone"]}
              label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-multiple.form.phone" />}
              rules={[{ message: "Please enter phone number" }]}
            >
              <Input placeholder="Phone" />
            </Form.Item>
          </div>
        ))}
      </Form>
    </Modal>
  );
};
