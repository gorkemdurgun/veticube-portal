import { Button, Card } from "antd";

type AppointmentActionsProps = {};

export const AppointmentActions: React.FC<AppointmentActionsProps> = () => {
  return (
    <Card>
      <div className="flex flex-row items-center justify-between gap-4 -m-2">
        <span className="text-lg font-semibold">Actions</span>
        <div className="flex flex-row gap-4">
          <Button>Add Appointment</Button>
          <Button>Add Block</Button>
        </div>
      </div>
    </Card>
  );
};
