import { useEffect, useRef, useState } from "react";

import { PiPlusBold as AddIcon } from "react-icons/pi";

import { Button, Card, Skeleton, Space, Tour } from "antd";

import { TranslatedText } from "@/components/common";

import type { TourProps } from "antd";

import { CreateClinicBranchModal, CreateClinicChooseModal } from "../modals";

type BranchesActionsProps = {
  isLoading?: boolean;
  clinicName?: string;
};

const BranchesActions: React.FC<BranchesActionsProps> = ({ isLoading, clinicName }) => {
  const ref1 = useRef(null);
  const [tourCreateClinicVisible, setTourCreateClinicVisible] = useState<boolean>(false);
  const [createClinicModalVisible, setCreateClinicModalVisible] = useState<boolean>(false);
  const [createBranchModalVisible, setCreateBranchModalVisible] = useState<boolean>(false);

  let clinicNotExists = !isLoading && !clinicName;
  let clinicExists = !isLoading && clinicName;

  const steps: TourProps["steps"] = [
    {
      title: "Create a Clinic",
      description: "Click here to create a clinic",
      target: () => ref1.current,
      nextButtonProps: { children: "OK" },
    },
  ];

  useEffect(() => {
    if (clinicNotExists) {
      setTourCreateClinicVisible(true);
    }
  }, [clinicNotExists]);

  return (
    <>
      <CreateClinicChooseModal visible={createClinicModalVisible} setVisible={setCreateClinicModalVisible} />
      {/* <CreateClinicBranchModal
        visible={createBranchModalVisible}
        setVisible={setCreateBranchModalVisible}
        clinicId={"a1751cac-1517-41d2-b62b-e9d192873e27"}
      /> */}
      {/* <Tour closable={false} open={tourCreateClinicVisible} steps={steps} onClose={() => setTourCreateClinicVisible(false)} /> */}
      <Card>
        <div className="flex flex-row items-center justify-between gap-4 -m-2">
          <>
            {isLoading && <Skeleton.Input style={{ width: 200 }} active />}
            {clinicNotExists && <h1 className="text-2xl font-semibold">Branches</h1>}
            {clinicExists && <h1 className="text-2xl font-semibold">{clinicName} - Şube Yönetimi</h1>}
          </>
          <>
            {clinicExists && (
              <Button type="primary" onClick={() => setCreateBranchModalVisible(true)}>
                <AddIcon className="mr-2" />
                <TranslatedText tPrefix="components" tKey="branches.branch-actions.add-branch" />
              </Button>
            )}
            {clinicNotExists && (
              <Space>
                <Button
                  ref={ref1}
                  type="primary"
                  onClick={() => {
                    if (ref1.current) {
                      setTourCreateClinicVisible(false);
                    }
                    setCreateClinicModalVisible(true);
                  }}
                >
                  <AddIcon className="mr-2" />
                  <TranslatedText tPrefix="components" tKey="branches.branch-actions.create-clinic" />
                </Button>
              </Space>
            )}
          </>
        </div>
      </Card>
    </>
  );
};

export default BranchesActions;
