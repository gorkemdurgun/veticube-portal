import { Button, Card } from "antd";
import { TranslatedText } from "@/components/common";
import { PiPlusBold as AddIcon } from "react-icons/pi";
import { AppointmentCreateModal } from "../modals";

type AppointmentActionsProps = {};

export const AppointmentActions: React.FC<AppointmentActionsProps> = () => {
  return (
    <>
    <AppointmentCreateModal visible={true} setVisible={() => {}} onCreated={() => {}} />
    <Card>
      <div className="flex flex-row items-center justify-between gap-4 -m-2">
        <TranslatedText className="text-lg font-semibold" tPrefix="components" tKey="appointments.appointment-actions.title" />
        <div className="flex flex-row gap-4">
          <Button>
            <AddIcon className="mr-2" />
            <TranslatedText tPrefix="components" tKey="appointments.appointment-actions.add-new" />
          </Button>
        </div>
      </div>
    </Card>
    </>
  );
};
