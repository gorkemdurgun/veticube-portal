import { Button, Card, Skeleton } from "antd";
import { TranslatedText } from "@/components/common";
import { PiPlusBold as AddIcon } from "react-icons/pi";
import { AppointmentCreateModal } from "../modals";

import { useState } from "react";

type BranchesActionsProps = {
  clinicName?: string;
};

export const BranchesActions: React.FC<BranchesActionsProps> = ({ clinicName }) => {
  const [createBranchModalVisible, setCreateBranchModalVisible] = useState<boolean>(false);

  return (
    <>
      {/* <AppointmentCreateModal visible={createModalVisible} setVisible={setCreateModalVisible} onCreated={() => {}} /> */}
      <Card>
        <div className="flex flex-row items-center justify-between gap-4 -m-2">
          {clinicName ? <h1 className="text-2xl font-semibold">{clinicName}</h1> : <Skeleton.Input style={{ width: 200 }} active />}
          <Button type="primary" onClick={() => {}}>
            <AddIcon className="mr-2" />
            <TranslatedText tPrefix="components" tKey="branches.branch-actions.add-new" />
          </Button>
        </div>
      </Card>
    </>
  );
};
