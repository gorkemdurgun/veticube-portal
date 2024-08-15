import { Divider, Button, Avatar, Tooltip } from "antd";
import { t } from "i18next";
import { memo, useState } from "react";
import { PiClockClockwise as RescheduleIcon, PiCheckCircle as CompleteIcon, PiXCircle as CancelIcon } from "react-icons/pi";
import { AppointmentCancelModal, AppointmentCompleteModal, AppointmentRescheduleModal } from "../modals";
import { CustomButton } from "../common";

const Component: React.FC<{ item: Appointment }> = ({ item }) => {
  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  let statusCardClass: { [key: string]: string } = {
    completed: "border-success-400",
    cancelled: "border-error-400",
    scheduled: "border-blue-400",
    rescheduled: "border-blue-400",
  };

  return (
    <>
      <>
        <AppointmentCancelModal appointment={item} visible={cancelModalVisible} setVisible={setCancelModalVisible} />
        <AppointmentCompleteModal appointment={item} visible={completeModalVisible} setVisible={setCompleteModalVisible} />
        <AppointmentRescheduleModal appointment={item} visible={rescheduleModalVisible} setVisible={setRescheduleModalVisible} />
      </>
      <>
        <div className={`flex flex-col items-start gap-2 py-2 px-4 mx-4 my-1 rounded-sm bg-gray-50 border-r-4 ${statusCardClass[item.status]}`}>
          <>
            <div className="w-full flex items-center justify-between gap-2">
              <span className="text-sm font-[500]">{item.appointmentTime}</span>
              <div className={`flex items-center justify-center gap-2 px-2 py-1 rounded-lg bg-gray-100`}>
                <span className="text-xs capitalize">{item.type}</span>
              </div>
            </div>
          </>
          <>
            <Avatar.Group>
              <Tooltip className="cursor-pointer" title="Pet Name">
                <Avatar className="bg-gray-200 text-gray-700" icon={<span className="text-md">P</span>} />
              </Tooltip>
              <Tooltip className="cursor-pointer" title={"Owner Name"}>
                <Avatar className="bg-gray-200 text-gray-700" icon={<span className="text-md">O</span>} />
              </Tooltip>
              <Tooltip className="cursor-pointer" title={"Vet Name"}>
                <Avatar className="bg-gray-200 text-gray-700" icon={<span className="text-md">V</span>} />
              </Tooltip>
            </Avatar.Group>
          </>
          <>
            <div className="w-full grid grid-cols-3 gap-1 mt-2">
              <CustomButton
                size="md"
                className="w-full"
                variant="neutral-text"
                onClick={() => setRescheduleModalVisible(true)}
                icon={RescheduleIcon}
              />
              <CustomButton
                size="md"
                className="w-full"
                variant="neutral-text"
                onClick={() => setCompleteModalVisible(true)}
                icon={CompleteIcon}
              />
              <CustomButton
                size="md"
                className="w-full"
                variant="neutral-text"
                onClick={() => setCancelModalVisible(true)}
                icon={CancelIcon}
              />
            </div>
          </>
        </div>
      </>
    </>
  );
};

export const SelectedDayListCard = memo(Component);
