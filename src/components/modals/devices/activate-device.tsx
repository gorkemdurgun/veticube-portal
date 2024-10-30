import { useState } from "react";

import { Button, Divider, Form, Input, Modal, Select } from "antd";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/hooks";

import CustomButton from "@/components/common/custom-button";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

type FormValues = {
  serialNo: string;
  selectedBranch: string;
};

const ActivateDeviceModal: React.FC<Props> = ({ visible, setVisible }) => {
  const dispatch = useAppDispatch();
  const { assignments } = useAppSelector((state) => state.user);

  const [deviceForm] = Form.useForm<FormValues>();

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = () => {};

  return (
    <Modal open={visible} title="Cihazı Aktive Et" onClose={handleCancel} footer={null}>
      <Form name="activate-device-form" layout="vertical" preserve={false} form={deviceForm}>
        <div className="relative h-40 w-full">
          <Image
            alt="Instructions"
            src={"https://d3d04dcnmm83ls.cloudfront.net/1807100_59be55795d9c4df0ad5193de426e5496.jpg"}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <Divider />
        <div className="flex flex-col">
          <span className="font-semibold">Lütfen cihazınızın arkasında bulunan seri numarasını giriniz.</span>
          <span className="text-sm text-gray-500">
            Seri numarası, cihazınızın arkasında bulunan etiket üzerinde yer almaktadır ve 16 karakterden oluşmaktadır.
          </span>
          <div className="flex flex-col mt-4">
            <Form.Item
              name="serialNo"
              label="Cihaz Seri No."
              rules={[{ required: true, message: "Lütfen geçerli bir seri numarası giriniz." }]}
            >
              <Input placeholder="XXXX-XXXX-XXXX-XXXX" />
            </Form.Item>
            <Form.Item
              name="selectedBranch"
              label="Şube"
              rules={[{ required: true, message: "Lütfen cihazı aktif etmek istediğiniz şubeyi seçiniz." }]}
            >
              <Select>
                {assignments.map((assignment) => (
                  <Select.Option key={assignment.branch.id} value={assignment.branch.id}>
                    {assignment.branch.branch_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <Form.Item>
            <CustomButton className="w-full" variant="primary-opaque" onClick={handleOk}>
              Activate Device
            </CustomButton>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default ActivateDeviceModal;
