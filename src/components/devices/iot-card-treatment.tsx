import React from "react";

import {
  PiCaretRight as DetailIcon,
  PiCaretCircleRight as ViewIcon,
  PiWhatsappLogo as WhatsappIcon,
  PiFlagBanner as FinishIcon,
} from "react-icons/pi";

import { Card, Divider, Tag } from "antd";
import dayjs from "dayjs";
import { IconType } from "react-icons";

import type { CardProps } from "antd";

import CustomButton from "../common/custom-button";

type Props = CardProps & {
  current_treatment: {
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

const Component: React.FC<Props> = ({ current_treatment, ...props }) => {
  return (
    <div className="flex flex-col p-3 bg-white rounded-lg shadow-md">
      <h3 className="text-md text-gray-700 font-normal">Tedavi Detayları</h3>
      <Divider className="mt-2 mb-4" />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between h-5">
          <span className="text-sm text-gray-500">Pet Adı</span>
          <div className="flex items-center">
            <span className="text-sm text-gray-700">{current_treatment.pet.name}</span>
            <CustomButton variant="neutral-text" icon={ViewIcon} onClick={() => console.log("Pet")} />
          </div>
        </div>
        <div className="flex items-center justify-between h-5">
          <span className="text-sm text-gray-500">Sahip Adı</span>
          <div className="flex items-center">
            <span className="text-sm text-gray-700">{current_treatment.pet.owner_name}</span>
            <CustomButton variant="neutral-text" icon={WhatsappIcon} onClick={() => console.log("Whatsapp")} />
          </div>
        </div>
        <div className="flex items-center justify-between h-5">
          <span className="text-sm text-gray-500">Tedavi Nedeni</span>
          <span className="text-sm text-gray-700">{current_treatment.treatment.reason}</span>
        </div>
        <div className="flex items-center justify-between h-5">
          <span className="text-sm text-gray-500">Başlangıç Tarihi</span>
          <span className="text-sm text-gray-700">{dayjs(current_treatment.treatment.start_date).format("DD.MM.YYYY HH:mm")}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <CustomButton className="w-full" variant="neutral-faded" icon={DetailIcon} onClick={() => console.log("Detail")}>
          Detay Görüntüle
        </CustomButton>
        <CustomButton className="w-full" variant="danger-faded" icon={FinishIcon} onClick={() => console.log("Finish")}>
          Tedaviyi Bitir
        </CustomButton>
      </div>
    </div>
  );
};

export const IotCardTreatment = React.memo(Component);
