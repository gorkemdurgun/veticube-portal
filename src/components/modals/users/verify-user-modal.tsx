import { Button, Form, Input, message, Modal, Select } from "antd";
import { TranslatedText } from "../../common";

import { useState } from "react";
import { auth } from "@/services/auth";
import { useAppQuery } from "@/hooks";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  data: {
    userEmail: string;
  };
};

export const VerifyUserModal: React.FC<Props> = ({ visible, setVisible, data }) => {
  const [otp, setOtp] = useState("");

  const { refetch: refetchClinics } = useAppQuery("GetClinicAndBranches");

  const handleOk = () => {
    if (!data.userEmail) {
      console.error("Vet email is required");
      return;
    }
    auth.signup.confirmUser(
      otp,
      data.userEmail,
      () => {
        message.success("User verified successfully");
        refetchClinics();
        setVisible(false);
      },
      (error) => {
        message.error(error.message);
      }
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
      title={<TranslatedText tPrefix="components" tKey="modals.verify-user.title" />}
      okButtonProps={{
        disabled: otp.length !== 6,
        onClick: handleOk,
      }}
      cancelButtonProps={{
        onClick: handleCancel,
      }}
    >
      <div className="flex flex-col py-2">
        <TranslatedText tPrefix="components" tKey="modals.verify-user.description" />
        <span className="font-bold text-gray-600">{data?.userEmail}</span>
        <div className="text-center pt-4">
          <Input.OTP length={6} value={otp} onChange={setOtp} />
        </div>
      </div>
    </Modal>
  );
};
