import { useState } from "react";

import { Button, Form, Input, message, Modal, Select } from "antd";

import { auth } from "@/services/cognito";

import { TranslatedText } from "../../common";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  data: {
    userEmail: string;
  };
  onSuccess?: () => void;
  onClosed?: () => void;
};

const VerifyUserModal: React.FC<Props> = ({ visible, setVisible, data, onSuccess, onClosed }) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleOk = () => {
    if (!data.userEmail) {
      console.error("Email not found in data");
      return;
    }
    setLoading(true);
    auth.signup.confirmUser(
      otp,
      data.userEmail,
      () => {
        message.success("User verified successfully");
        setVisible(false);
        setLoading(false);
        if (onSuccess) {
          onSuccess();
        }
      },
      (error) => {
        message.error(error.message);
        setLoading(false);
      }
    );
  };

  const handleCancel = () => {
    setVisible(false);
    if (onClosed) {
      onClosed();
    }
  };

  return (
    <Modal
      closable={false}
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title={<TranslatedText tPrefix="components" tKey="modals.verify-user.title" />}
      confirmLoading={loading}
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

export default VerifyUserModal;