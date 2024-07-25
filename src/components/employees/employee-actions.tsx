import { Button, Card } from "antd";
import { TranslatedText } from "@/components/common";
import { PiPlusBold as AddIcon } from "react-icons/pi";
import { AppointmentCreateModal } from "../modals";
import { useState } from "react";

type EmployeeActionsProps = {};

export const EmployeeActions: React.FC<EmployeeActionsProps> = () => {
  const [createVetAccountModalVisible, setCreateVetAccountModalVisible] = useState(false);
  const [createStaffAccountModalVisible, setCreateStaffAccountModalVisible] = useState(false);

  return (
    <>
      {/* <AppointmentCreateModal visible={createModalVisible} setVisible={setCreateModalVisible} onCreated={() => {}} /> */}
      <Card>
        <div className="flex flex-row items-center justify-between gap-4 -m-2">
          <TranslatedText className="text-lg font-semibold" tPrefix="components" tKey="employees.employee-actions.title" />
          <div className="flex flex-row gap-2">
            <Button type="primary" onClick={() => {}}>
              <AddIcon className="mr-2" />
              <TranslatedText tPrefix="components" tKey="employees.employee-actions.add-new-vet" />
            </Button>
            <Button type="primary" onClick={() => {}}>
              <AddIcon className="mr-2" />
              <TranslatedText tPrefix="components" tKey="employees.employee-actions.add-new-staff" />
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
};
