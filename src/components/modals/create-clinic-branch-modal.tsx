import { Checkbox, Divider, Form, Input, InputNumber, message, Modal } from "antd";
import { TranslatedText } from "../common";
import { useState } from "react";
import { mutations } from "@/services/db";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { createClinicRequest } from "@/redux/slices/clinicSlice";
import { useMutation } from "react-query";
import { AddVeterinaryModal } from "./add-veterinary-modal";

type CreateClinicBranchModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  clinicId: string;
};

type BranchFormValues = {
  name: string;
  city?: string;
  address?: string;
  phone?: string;
};

export const CreateClinicBranchModal: React.FC<CreateClinicBranchModalProps> = ({ visible, setVisible, clinicId }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.clinic);
  const [createBranchForm] = Form.useForm<BranchFormValues>();

  const {
    mutate: createBranchMutation,
    data: createBranchData,
    isLoading: isCreatingBranch,
    isError: createBranchError,
    error: createBranchErrorData,
  } = useMutation(
    (values: BranchFormValues) => {
      return mutations.clinics.createBranch(clinicId, values.name, values.city, values.address, values.phone);
    },
    {
      onSuccess: (data) => {
        console.log(data);
        message.success("Branch created successfully");
      },
      onError: (error) => {
        message.error("Error creating branch");
      },
    }
  );

  const handleOk = () => {
    const branchValues = createBranchForm.getFieldsValue();

    createBranchForm.validateFields().then(() => {
      createBranchMutation(branchValues);
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Modal
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        title={
          <div className="flex flex-col items-center text-center gap-2">
            <TranslatedText className="text-2xl font-semibold" tPrefix="components" tKey="modals.create-clinic-branch.title" />
            <TranslatedText className="text-sm text-gray-400 font-normal" tPrefix="components" tKey="modals.create-clinic-branch.subtitle" />
            <Divider className="my-2" />
          </div>
        }
      >
        <Form layout="vertical" form={createBranchForm}>
          <Form.Item
            required
            name="name"
            label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-branch.form.name" />}
            rules={[{ required: true, message: "Please enter clinic name" }]}
          >
            <Input placeholder="Clinic Name" />
          </Form.Item>
          <Form.Item name={"city"} label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-branch.form.city" />}>
            <Input placeholder="City" />
          </Form.Item>
          <Form.Item name={"address"} label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-branch.form.address" />}>
            <Input placeholder="Address" />
          </Form.Item>
          <Form.Item name={"phone"} label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-branch.form.phone" />}>
            <Input placeholder="Phone" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
