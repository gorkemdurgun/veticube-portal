import { Checkbox, Divider, Form, Input, InputNumber, Modal } from "antd";
import { TranslatedText } from "../common";
import { useState } from "react";
import { mutations } from "@/services/db";
import { useAppDispatch } from "@/hooks";
import { createClinicRequest } from "@/redux/slices/clinicSlice";

type CreateClinicModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

type CreateClinicFormValues = {
  name: string;
};
type CreateBranchFormValues = {
  branch: {
    name: string;
    city: string;
    address: string;
    phone: string;
  }[];
};

export const CreateClinicModal: React.FC<CreateClinicModalProps> = ({ visible, setVisible }) => {
  const dispatch = useAppDispatch();
  const [createClinicForm] = Form.useForm<CreateClinicFormValues>();
  const [createBranchForm] = Form.useForm<CreateBranchFormValues>();
  const [isHaveMultipleBranches, setIsHaveMultipleBranches] = useState<boolean>(false);
  const [branchCount, setBranchCount] = useState<number | null>(1);

  const handleOk = () => {
    const clinicValues = createClinicForm.getFieldsValue();
    const branchValues = createBranchForm.getFieldsValue();

    console.log(clinicValues, branchValues);

    dispatch(
      createClinicRequest({
        name: clinicValues.name,
        branches: branchValues.branch.map((branch) => ({
          name: branch.name,
          city: branch.city,
          address: branch.address,
          phone: branch.phone,
        })),
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
      title={<TranslatedText tPrefix="components" tKey="modals.create-clinic.title" />}
    >
      <Form layout="vertical" form={createClinicForm}>
        <Form.Item
          required
          name="name"
          label={<TranslatedText tPrefix="components" tKey="modals.create-clinic.form.name" />}
          rules={[{ required: true, message: "Please enter clinic name" }]}
        >
          <Input placeholder="Clinic Name" />
        </Form.Item>
        <div className="grid grid-cols-2 items-center gap-2 bg-gray-100 p-2 rounded-md">
          <Checkbox checked={isHaveMultipleBranches} onChange={(e) => setIsHaveMultipleBranches(e.target.checked)}>
            <TranslatedText tPrefix="components" tKey="modals.create-clinic.have-multiple-branches" />
          </Checkbox>
          <InputNumber
            className="w-full"
            disabled={!isHaveMultipleBranches}
            min={1}
            max={5}
            addonBefore={<TranslatedText tPrefix="components" tKey="modals.create-clinic.branch-count" />}
            value={branchCount}
            onChange={(value) => setBranchCount(value)}
          />
        </div>
      </Form>
      <Divider className="my-2" />
      {isHaveMultipleBranches && (
        <Form layout="vertical" form={createBranchForm}>
          {[...Array(branchCount)].map((_, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 p-2 my-2 bg-gray-100 rounded-md">
              <h1 className="text-lg font-semibold">{index + 1}.</h1>
              <Divider className="my-1" />
              <Form.Item
                required
                name={["branch", index, "name"]}
                label={<TranslatedText tPrefix="components" tKey="modals.create-clinic.form.branch-name" />}
                rules={[{ required: true, message: "Please enter branch name" }]}
              >
                <Input placeholder="Branch Name" />
              </Form.Item>
              <Form.Item
                name={["branch", index, "city"]}
                label={<TranslatedText tPrefix="components" tKey="modals.create-clinic.form.city" />}
                rules={[{ message: "Please enter city" }]}
              >
                <Input placeholder="City" />
              </Form.Item>
              <Form.Item
                name={["branch", index, "address"]}
                label={<TranslatedText tPrefix="components" tKey="modals.create-clinic.form.address" />}
                rules={[{ message: "Please enter address" }]}
              >
                <Input placeholder="Address" />
              </Form.Item>
              <Form.Item
                name={["branch", index, "phone"]}
                label={<TranslatedText tPrefix="components" tKey="modals.create-clinic.form.phone" />}
                rules={[{ message: "Please enter phone number" }]}
              >
                <Input placeholder="Phone" />
              </Form.Item>
            </div>
          ))}
        </Form>
      )}
    </Modal>
  );
};
