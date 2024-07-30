import { Button, Form, Input, message, Modal, Select } from "antd";
import { TranslatedText } from "../common";

import { useState } from "react";
import { auth } from "@/services/auth";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  email: string;
};

export const VerifyVeterinaryModal: React.FC<Props> = ({ visible, setVisible, email }) => {
  const [otp, setOtp] = useState("");

  const handleOk = () => {
    auth.signup.confirmUser(
      otp,
      email,
      () => {
        message.success("User verified successfully");
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
        <span className="font-bold text-gray-600">{email}</span>
        <div className="text-center pt-4">
          <Input.OTP length={6} value={otp} onChange={setOtp} />
        </div>
      </div>
    </Modal>
  );
};
