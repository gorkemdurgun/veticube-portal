import { useState } from "react";

import { Button, Form, Input, message, Modal, Select } from "antd";

import { useCustomAppQuery } from "@/hooks";
import { auth } from "@/services/cognito";
import { queries } from "@/services/db";

import { TranslatedText } from "../../common";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  data: {
    userEmail: string;
  };
};

export const VerifyUserModal: React.FC<Props> = ({ visible, setVisible, data }) => {
  const [otp, setOtp] = useState("");

  const { refetch: refetchClinics } = useCustomAppQuery({
    query: queries.clinic.GetClinicAndBranches,
  });

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
