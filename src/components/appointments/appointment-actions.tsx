import { Button, Card } from "antd";
import { TranslatedText } from "@/components/common";

type AppointmentActionsProps = {};

export const AppointmentActions: React.FC<AppointmentActionsProps> = () => {
  return (
    <Card>
      <div className="flex flex-row items-center justify-between gap-4 -m-2">
        <TranslatedText className="text-lg font-semibold" tPrefix="components" tKey="appointments.appointment-actions.title" />
        <div className="flex flex-row gap-4">
          <Button>Add Appointment</Button>
          <Button>Add Block</Button>
        </div>
      </div>
    </Card>
  );
};
