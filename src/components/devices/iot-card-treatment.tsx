import React from "react";

import { PiDeviceTabletCameraBold as IotIcon, PiArrowRight as DetailIcon } from "react-icons/pi";

import { Card, Descriptions, Tag } from "antd";
import dayjs from "dayjs";
import { IconType } from "react-icons";

import type { CardProps } from "antd";

import CustomButton from "../common/custom-button";

type Props = CardProps & {
  active_treatment: {
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

const Component: React.FC<Props> = ({ active_treatment, ...props }) => {
  return (
    <div>
      <Tag className="w-full text-center text-sm p-1 my-1" color="success">
        Aktif Tedavi Var
      </Tag>
      <Descriptions bordered size="small" column={2} className="mt-2">
        <Descriptions.Item label="Pet" span={2}>
          <div className="flex items-center justify-between gap-2">
            <span>{active_treatment.pet.name}</span>
            <CustomButton variant="neutral-faded" size="xs" icon={DetailIcon} />
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Sahibi" span={2}>
          <div className="flex items-center justify-between gap-2">
            <span>{active_treatment.pet.owner_name}</span>
            <CustomButton variant="neutral-faded" size="xs" icon={DetailIcon} />
          </div>
        </Descriptions.Item>
        <Descriptions.Item label="Tedavi Nedeni" span={2}>
          {active_treatment.treatment.reason}
        </Descriptions.Item>
        <Descriptions.Item label="Tedavi Başlangıcı" span={2}>
          {dayjs(active_treatment.treatment.start_date).format("DD/MM/YYYY HH:mm")}
        </Descriptions.Item>
      </Descriptions>
      <div className="grid grid-cols-2 gap-2 mt-2">
        <CustomButton className="w-full" variant="neutral-faded" size="sm" onClick={() => console.log("Detaylar")}>
          Detaylar
        </CustomButton>
        <CustomButton className="w-full" variant="neutral-faded" size="sm" onClick={() => console.log("Sonlandır")}>
          Sonlandır
        </CustomButton>
      </div>
    </div>
  );
};

export const IotCardTreatment = React.memo(Component);
