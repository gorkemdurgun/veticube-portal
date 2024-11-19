import React from "react";

import { PiDeviceTabletCameraBold as IotIcon, PiGear as SettingsIcon, PiArrowRight as DetailIcon } from "react-icons/pi";

import { Card, Tag } from "antd";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";

import { IotCardEmpty } from "./iot-card-empty";
import { IotCardTreatment } from "./iot-card-treatment";

import type { CardProps } from "antd";

import CustomButton from "../common/custom-button";

type Props = CardProps & {
  iot: {
    nick_name: string;
    type: string;
    model: string;
    serial_number: string;
  };
  current_treatment?: {
    pet: {
      name: string;
      owner_name: string;
    };
    treatment: {
      reason: string;
      start_date: string;
    };
  };
};

const Component: React.FC<Props> = ({ iot, current_treatment, ...props }) => {
  const router = useRouter();

  return (
    <Card
      className="border-0 shadow-basic"
      classNames={{
        header: `!bg-gradient-to-r from-gray-50/50 to-gray-50/10`,
        title: `text-gray-700 text-md font-normal`,
        body: `!p-4 bg-gray-50/50`,
      }}
      title={
        <div className="flex justify-between items-center">
          {iot.nick_name}
          <div className="flex items-center gap-2">
            <Tag color={current_treatment ? "success" : "warning"}>{current_treatment ? "Aktif Tedavi" : "Kullanıma Hazır"}</Tag>
            {/* <CustomButton variant="neutral-text" icon={SettingsIcon} onClick={() => console.log("Edit")} /> */}
            <CustomButton variant="neutral-text" icon={DetailIcon} onClick={() => router.push(`/admin/devices/${iot.serial_number}`)} />
          </div>
        </div>
      }
      {...props}
    >
      <div className="flex flex-col gap-2">
        {current_treatment ? (
          <IotCardTreatment
            current_treatment={{
              pet: current_treatment.pet,
              treatment: current_treatment.treatment,
            }}
          />
        ) : (
          <IotCardEmpty />
        )}
      </div>
    </Card>
  );
};

export const IotCard = React.memo(Component);
