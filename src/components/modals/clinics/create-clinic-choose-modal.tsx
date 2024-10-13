import { useState } from "react";

import { PiWarehouseDuotone as OneBranchIcon, PiBuildingOfficeDuotone as MultiBranchIcon } from "react-icons/pi";

import { Card, Checkbox, Divider, Form, Input, InputNumber, Modal } from "antd";

import { useAppDispatch } from "@/hooks";
import { mutations } from "@/services/db";

import { CreateClinicMultipleModal } from "./create-clinic-multiple-modal";
import { CreateClinicSingleModal } from "./create-clinic-single-modal";

import { TranslatedText } from "../../common";

type CreateClinicChooseModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};
type ClinicType = "single" | "multiple";

export const CreateClinicChooseModal: React.FC<CreateClinicChooseModalProps> = ({ visible, setVisible }) => {
  const dispatch = useAppDispatch();
  const [clinicType, setClinicType] = useState<string>();
  const [createSingleModalVisible, setCreateSingleModalVisible] = useState<boolean>(false);
  const [createMultipleModalVisible, setCreateMultipleModalVisible] = useState<boolean>(false);

  const onClickCard = (type: ClinicType) => {
    setClinicType(type);
  };

  const handleOk = () => {
    if (clinicType === "single") {
      setCreateSingleModalVisible(true);
    } else if (clinicType === "multiple") {
      // setCreateMultipleModalVisible(true);
    }
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <CreateClinicSingleModal visible={createSingleModalVisible} setVisible={setCreateSingleModalVisible} />
      {/* <CreateClinicMultipleModal visible={createMultipleModalVisible} setVisible={setCreateMultipleModalVisible} /> */}
      <Modal
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        title={
          <div className="flex flex-col items-center text-center gap-2">
            <TranslatedText className="text-2xl font-semibold" tPrefix="components" tKey="modals.choose-clinic.title" />
            <TranslatedText className="text-sm text-gray-400 font-normal" tPrefix="components" tKey="modals.choose-clinic.subtitle" />
            <Divider className="my-2" />
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <Card
            className={`cursor-pointer border-2 transition-all ${
              clinicType === "single" ? "border-blue-500 bg-blue-50" : "border border-gray-200"
            }`}
            classNames={{
              body: "flex flex-col items-center justify-center text-center gap-4",
            }}
            onClick={() => onClickCard("single")}
          >
            <h1 className="text-2xl font-semibold">I have clinic that has one branch</h1>
            <p className="text-sm text-gray-400">
              This option is for clinics that have only one clinic, if you select this option you will be able to add only one branch.
            </p>
            <OneBranchIcon className={`w-32 h-32 transition-all ${clinicType === "single" ? "text-blue-500" : ""}`} />
          </Card>
          <Card
            aria-disabled={true}
            className={`cursor-pointer border-2 transition-all ${
              clinicType === "multiple" ? "border-blue-500 bg-blue-50" : "border border-gray-200"
            }`}
            classNames={{
              body: "flex flex-col items-center justify-center text-center gap-4",
            }}
            onClick={() => onClickCard("multiple")}
          >
            <h1 className="text-2xl font-semibold">I have clinic that has multiple branches</h1>
            <p className="text-sm text-gray-400">
              This option is for clinics that have multiple branches, if you select this option you will be able to add multiple branches.
            </p>
            <MultiBranchIcon className={`w-32 h-32 transition-all ${clinicType === "multiple" ? "text-blue-500" : ""}`} />
          </Card>
        </div>
      </Modal>
    </>
  );
};
