import { useState } from "react";

import { Button, Divider, Form, Input, Modal, Select } from "antd";

import { useAppDispatch, useCustomAppQuery } from "@/hooks";
import { signUpVetAccountRequest } from "@/redux/slices/authSlice";
import { queries } from "@/services/db";

import { VerifyUserModal } from "./verify-user-modal";

import { CountrySelector, TranslatedText } from "../../common";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  data: {
    clinicId: string;
    branchName: string;
  };
};

type CreateVetFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  country_code: string;
  phone: string;
  specilization: string;
};

export const AddVeterinaryModal: React.FC<Props> = ({ visible, setVisible, data }) => {
  const dispatch = useAppDispatch();
  const [createForm] = Form.useForm<CreateVetFormValues>();
  const [verifyModalVisible, setVerifyModalVisible] = useState(false);
  const [createdEmail, setCreatedEmail] = useState("");

  const { refetch: refetchClinics } = useCustomAppQuery({
    query: queries.clinic.GetClinicAndBranches,
  });

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {
    const values = createForm.getFieldsValue();
    if (!data.clinicId || !data.branchName) {
      return;
    }

    createForm.validateFields().then(() => {
      // console.log(values, data);
    });

    dispatch(
      signUpVetAccountRequest({
        clinicBranchId: data.clinicId,
        firstName: values.first_name,
        lastName: values.last_name,
        email: values.email,
        password: values.password,
        countryCode: values.country_code,
        phoneNumber: values.phone,
        specilization: values.specilization,
        onSuccess: (email) => {
          refetchClinics();
          setCreatedEmail(email);
          setVisible(false);
          setVerifyModalVisible(true);
          createForm.resetFields();
        },
        onError: (error) => {
          // console.log(error);
        },
      })
    );
  };

  return (
    <>
      <VerifyUserModal visible={verifyModalVisible} setVisible={setVerifyModalVisible} data={{ userEmail: createdEmail }} />
      <Modal
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        title={
          <div className="flex flex-col items-center text-center gap-2">
            <TranslatedText className="text-2xl font-semibold" tPrefix="components" tKey="modals.add-vet.title" />
            <TranslatedText className="text-sm text-gray-500 font-normal" tPrefix="components" tKey="modals.add-vet.subtitle" />
            <Divider className="my-2" />
          </div>
        }
        okButtonProps={{ onClick: handleOk }}
        cancelButtonProps={{ onClick: handleCancel }}
      >
        <Form name="create-vet-form" layout="vertical" preserve={false} form={createForm}>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Form.Item name="first_name" label="First Name" rules={[{ required: true, message: "Please input first name!" }]}>
              <Input placeholder="Veterinary First Name" />
            </Form.Item>
            <Form.Item name="last_name" label="Last Name" rules={[{ required: true, message: "Please input last name!" }]}>
              <Input placeholder="Veterinary Last Name" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please input email!" }]}>
              <Input placeholder="Veterinary Email" />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please input password!" }]}>
              <Input.Password placeholder="Password" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="country_code"
              label="Country Code"
              preserve={false}
              rules={[{ required: true, message: "Please input country code!" }]}
            >
              <CountrySelector
                value={createForm.getFieldValue("country_code")}
                onChange={(value) => createForm.setFieldsValue({ country_code: value })}
              />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Please input phone!" }]}>
              <Input placeholder="Phone Number" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Branch">
              <Input readOnly disabled value={data.branchName} />
            </Form.Item>
            <Form.Item name="specilization" label="Specilization">
              <Input placeholder="Veterinary Specilization" />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};
