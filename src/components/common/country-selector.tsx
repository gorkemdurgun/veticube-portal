import { useState } from "react";

import { PiFlag as FlagIcon } from "react-icons/pi";

import { Select } from "antd";

import { countries } from "@/constants/countries";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const CountrySelector: React.FC<Props> = ({ value, onChange }) => {
  const [activeValue, setActiveValue] = useState<string>(value);

  return (
    <Select
      showSearch
      optionFilterProp="search"
      placeholder="Select a country"
      value={activeValue}
      onChange={(value) => {
        setActiveValue(value);
        onChange(value.split(")")[0].replace("(", ""));
      }}
      labelRender={(s) => (
        <div className="flex items-center space-x-2">
          <FlagIcon className="text-xl" />
          <span>{s.value}</span>
        </div>
      )}
      options={countries.map((item, index) => {
        return {
          key: index,
          search: item.name,
          value: "(" + item.code + ")" + " " + item.iso,
          label: "(" + item.code + ")" + " " + item.name,
        };
      })}
    />
  );
};
