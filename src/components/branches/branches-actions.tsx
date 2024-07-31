import { Button, Card, Skeleton, Space, Tour } from "antd";
import { TranslatedText } from "@/components/common";
import { PiPlusBold as AddIcon } from "react-icons/pi";
import { AppointmentCreateModal } from "../modals";
import type { TourProps } from "antd";

import { useEffect, useRef, useState } from "react";

type BranchesActionsProps = {
  isLoading?: boolean;
  clinicName?: string;
};

export const BranchesActions: React.FC<BranchesActionsProps> = ({ isLoading, clinicName }) => {
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
      <Tour closable={false} open={tourCreateClinicVisible} steps={steps} onClose={() => setTourCreateClinicVisible(false)} />
      <Card>
        <div className="flex flex-row items-center justify-between gap-4 -m-2">
          <>
            {isLoading && <Skeleton.Input style={{ width: 200 }} active />}
            {clinicNotExists && <h1 className="text-2xl font-semibold">Branches</h1>}
            {clinicExists && <h1 className="text-2xl font-semibold">{clinicName}</h1>}
          </>
          <>
            {clinicExists && (
              <Button type="primary" onClick={() => {}}>
                <AddIcon className="mr-2" />
                <TranslatedText tPrefix="components" tKey="branches.branch-actions.add-branch" />
              </Button>
            )}
            {clinicNotExists && (
              <Space>
                <Button ref={ref1} type="primary" onClick={() => setCreateClinicModalVisible(true)}>
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
