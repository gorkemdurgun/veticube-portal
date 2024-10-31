import { Divider, Form, Input, Modal, Select } from "antd";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "@/hooks";

import CustomButton from "@/components/common/custom-button";
import SerialNumberInput from "@/components/inputs/serial-number-input";

type Props = {
  visible: boolean;
  onClose: () => void;
};

type FormValues = {
  serialNo: string;
  selectedBranch: string;
};

const ActivateDeviceModal: React.FC<Props> = ({ visible, onClose }) => {
  const dispatch = useAppDispatch();
  const { assignments } = useAppSelector((state) => state.user);

  const [deviceForm] = Form.useForm<FormValues>();

  const handleCancel = () => {
    deviceForm.resetFields();
    onClose();
  };

  const handleOk = () => {
    deviceForm
      .validateFields()
      .then((values) => {
        console.log(values);
        // deviceForm.resetFields();
        // onClose();
      })
      .catch((error) => {
        console.error("Validation failed:", error);
      });
  };

  return (
    <Modal open={visible} title="Cihazı Aktive Et" onClose={handleCancel} onCancel={handleCancel} footer={null}>
      <Form name="activate-device-form" layout="vertical" preserve={false} form={deviceForm}>
        <div className="relative h-[300px] w-full">
          <Image
            alt="Instructions"
            src={"https://stg-images.samsung.com/is/image/samsung/assets/ph/microwave-oven-model-number.png?$ORIGIN_PNG$"}
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
            <Form.Item name="serialNo" label="Seri Numarası" rules={[{ required: true, message: "Lütfen geçerli bir seri numarası giriniz." }]}>
              <SerialNumberInput
                value={deviceForm.getFieldValue("serialNo")}
                onChange={(value) => deviceForm.setFieldsValue({ serialNo: value })}
              />
            </Form.Item>
            <Form.Item
              name="selectedBranch"
              label="Şube"
              rules={[{ required: true, message: "Lütfen cihazı aktif etmek istediğiniz şubeyi seçiniz." }]}
            >
              <Select placeholder="Cihazı hangi şubede kullanmak istediğinizi seçiniz.">
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
