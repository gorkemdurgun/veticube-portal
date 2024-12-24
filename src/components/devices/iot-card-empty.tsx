import React from "react";

import { PiDeviceTabletCameraBold as IotIcon, PiArrowRight as DetailIcon } from "react-icons/pi";

import { Card, Descriptions, Select, Tag } from "antd";
import dayjs from "dayjs";
import { IconType } from "react-icons";

import type { CardProps } from "antd";

import CustomButton from "../common/custom-button";
import SearchPetInput from "../inputs/search-pet-input";

type Props = CardProps & {};

const Component: React.FC<Props> = ({ ...props }) => {
  return (
    <div className="flex flex-col gap-2">
      <Tag className="w-full text-center text-sm text-gray-700 p-1 my-1" color="default">
        Aktif Tedavi Yok
      </Tag>
      <div className="flex flex-col gap-4 px-2 py-4 bg-gray-50 rounded-lg">
        <span className="text-center text-sm text-gray-700">
          Evcil hayvanı üniteye yerleştirdikten sonra aşağıdaki adımları takip ederek tedavi başlatabilirsiniz.
        </span>
        <div className="flex flex-col items-center gap-2">
          <SearchPetInput />
          {/* <Select showSearch className="w-full" placeholder="Tedavi Seç" /> */}
        </div>
        <CustomButton className="w-full" variant="primary-faded" size="sm" onClick={() => console.log("Detaylar")}>
          Tedavi Başlat
        </CustomButton>
      </div>
    </div>
  );
};

export const IotCardEmpty = React.memo(Component);
