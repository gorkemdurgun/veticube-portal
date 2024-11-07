import React from "react";

import { PiDeviceTabletCameraBold as IotIcon } from "react-icons/pi";

import { Card, Descriptions, Tag } from "antd";
import { IconType } from "react-icons";

import { IotCardTreatment } from "./iot-card-treatment";

import type { CardProps } from "antd";

type Props = CardProps & {
  iot: {
    nick_name: string;
    type: string;
    model: string;
  };
  treatment?: {
    pet: {
      name: string;
      owner_name: string;
    };
    treatment: {
      reason: string;
      start_date: string;
    };
  } | null;
};

const Component: React.FC<Props> = ({ iot, treatment, ...props }) => {
  return (
    <Card
      className="border-0 shadow-basic"
      classNames={{
        header: `!bg-gradient-to-r from-teal-50/50 to-teal-50/10`,
        title: `text-teal-600 text-lg font-semibold`,
        body: `!p-2`,
      }}
      title={
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <IotIcon size={24} />
            {iot.nick_name}
          </div>
          <div className="flex gap-2 font-[500]">
            <span className="text-sm text-gray-500">
              {iot.type}
              <span className="text-gray-400"> | {iot.model}</span>
            </span>
          </div>
        </div>
      }
      {...props}
    >
      {treatment && (
        <IotCardTreatment
          active_treatment={{
            pet: treatment.pet,
            treatment: treatment.treatment,
          }}
        />
      )}
    </Card>
  );
};

export const IotCard = React.memo(Component);
