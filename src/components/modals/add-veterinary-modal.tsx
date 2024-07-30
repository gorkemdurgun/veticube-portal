import { Button, Form, Input, Modal, Select } from "antd";
import { TranslatedText } from "../common";
import { useAppDispatch } from "@/hooks";
import { signUpVetAccountRequest } from "@/redux/slices/authSlice";
import { useState } from "react";
import { VerifyVeterinaryModal } from "./verify-veterinary-modal";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

type CreateVetFormValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  country_code: string;
  phone: string;
  clinic_branch: string;
  specilization: string;
};

export const AddVeterinaryModal: React.FC<Props> = ({ visible, setVisible }) => {
  const dispatch = useAppDispatch();
  const [createForm] = Form.useForm<CreateVetFormValues>();

  const [sendedEmail, setSendedEmail] = useState<string>("");
  const [verifyModalVisible, setVerifyModalVisible] = useState<boolean>(false);

  const handleOk = () => {
    // setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = () => {
    const values = createForm.getFieldsValue();
    dispatch(
      signUpVetAccountRequest({
        firstName: values.first_name,
        lastName: values.last_name,
        email: values.email,
        password: values.password,
        countryCode: values.country_code,
        phoneNumber: values.phone,
        clinicBranchId: values.clinic_branch,
        specilization: values.specilization,
        onSuccess: (email) => {
          setSendedEmail(email);
          setTimeout(() => {
            setVerifyModalVisible(true);
          });
        },
        onError: (error) => {
          // console.error(error);
        },
      })
    );
  };

  const dummyCoCodes = [
    { value: "90", label: "+90" },
    { value: "1", label: "+1" },
    { value: "61", label: "+61" },
  ];

  const dummyClinicBranches = [
    { value: "3aac7a8f-0bd5-4634-b92f-5d1aa30bbf5b", label: "Clinic Branch 1" },
    { value: "3ce2ed1e-3d34-4cc3-8034-9735a4f7d724", label: "Clinic Branch 2" },
  ];

  return (
    <>
      <VerifyVeterinaryModal visible={verifyModalVisible} setVisible={setVerifyModalVisible} email={sendedEmail} />
      <Modal
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        title={<TranslatedText tPrefix="components" tKey="modals.add-vet.title" />}
        okButtonProps={{ hidden: true }}
        cancelButtonProps={{ hidden: true }}
      >
        <Form name="create-vet-form" layout="vertical" preserve={false} form={createForm} onFinish={handleSubmit}>
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
            <Form.Item name="country_code" label="Country Code" rules={[{ required: true, message: "Please select country code!" }]}>
              <Select options={dummyCoCodes} placeholder="Country Code" />
            </Form.Item>
            <Form.Item name="phone" label="Phone" rules={[{ required: true, message: "Please input phone!" }]}>
              <Input placeholder="Phone Number" />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="clinic_branch" label="Clinic Branch" rules={[{ required: true, message: "Please select clinic branch!" }]}>
              <Select options={dummyClinicBranches} placeholder="Clinic Branch" />
            </Form.Item>
            <Form.Item name="specilization" label="Specilization">
              <Input placeholder="Veterinary Specilization" />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              gönder
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
