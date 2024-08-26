import { useState } from "react";

import { PiPlusBold as AddIcon } from "react-icons/pi";

import { Button, Card } from "antd";

import { CustomButton, TranslatedText } from "@/components/common";
import CreateAppointmentDrawer from "@/components/drawers/appointments/create-appointment";

type AppointmentActionsProps = {};

export const AppointmentActions: React.FC<AppointmentActionsProps> = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false);

  return (
    <>
      <CreateAppointmentDrawer visible={createModalVisible} setVisible={setCreateModalVisible} />
      <Card>
        <div className="flex flex-row items-center justify-between gap-4 -m-2">
          <TranslatedText className="text-lg font-semibold" tPrefix="components" tKey="appointments.appointment-actions.title" />
          <div className="flex flex-row gap-4">
            <CustomButton variant="primary-opaque" onClick={() => setCreateModalVisible(true)}>
              <AddIcon className="mr-2" />
              <TranslatedText tPrefix="components" tKey="appointments.appointment-actions.add-new" />
            </CustomButton>
          </div>
        </div>
      </Card>
    </>
  );
};
