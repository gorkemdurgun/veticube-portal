"use client";

import React, { useEffect, useState } from "react";

import { UserOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Input, message } from "antd";

import type { GetProps } from "antd";
// import { verifyEmail } from "@/services/cognito/authenticate";

type OTPProps = GetProps<typeof Input.OTP>;

const RegisterVerify: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(() => {
    const savedTimer = localStorage.getItem("otp-timer");
    return savedTimer ? Number(savedTimer) : 60;
  });

  const onResend = async () => {
    try {
      // OTP gönderme işlemi burada yapılır
      // API çağrısı örneği:
      // await fetch('/api/resend-otp', { method: 'POST' });

      // Başarılı olduğunda timer'ı sıfırla ve yerel depolamayı güncelle
      setTimer(60);
      localStorage.setItem("otp-timer", "60");
      message.success("OTP yeniden gönderildi!");
    } catch (error) {
      message.error("OTP gönderilemedi. Lütfen tekrar deneyin.");
    }
  };

  const onSubmit = async () => {
    // await verifyEmail(email, otp);
  };

  const onChange: OTPProps["onChange"] = (text) => {
    // console.log("onChange:", text);
  };

  const sharedProps: OTPProps = {
    onChange,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          return 0;
        }
        const newTimer = prev - 1;
        localStorage.setItem("otp-timer", newTimer.toString());
        return newTimer;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timer]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card
        title="Register Verify"
        className="w-96"
        classNames={{
          title: "text-2xl text-center",
        }}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <Input
            prefix={<UserOutlined className="text-gray-400" />}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input.OTP {...sharedProps} length={6} value={otp} onChange={setOtp} />
        </div>
        <Button type="primary" className="w-full mt-4" onClick={onSubmit}>
          Verify
        </Button>
        <Divider />
        <div className="text-center">
          <span className="text-gray-500">Didnt receive the OTP?</span>
          <Button type="link" className="w-full font-semibold" onClick={onResend} disabled={timer !== 0}>
            Resend OTP <span className="text-gray-500">{timer !== 0 ? `in ${timer}s` : ""}</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RegisterVerify;
