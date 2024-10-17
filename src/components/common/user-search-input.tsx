import { useCallback, useEffect, useState } from "react";

import { PiScanDuotone as ScanIcon, PiCheckCircleDuotone as AvailableIcon, PiWarningCircle as ExistIcon } from "react-icons/pi";

import { Select, Spin } from "antd";
import { debounce } from "lodash";

import CustomButton from "./custom-button";

import type { SelectProps } from "antd";
import type { DefaultOptionType } from "rc-select/lib/Select";

type Props = {
  inputClassName?: string;
  onSelectUserId?: (userId: string) => void;
};

const UserSearchInput: React.FC<Props> = ({ inputClassName, onSelectUserId }) => {
  const [value, onChange] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<DefaultOptionType | null>(null);
  const [selectOptions, setSelectOptions] = useState<SelectProps["options"]>([]);

  const url = "https://api.github.com/search/users?q=";

  const onSearchChange = async (searchText: string) => {
    if (searchText.length < 3) {
      setSelectOptions([]);
      return;
    }

    const response = await fetch(url + searchText);
    const data = await response.json();

    console.log("data", data);
    const options = data.items?.map((user: any) => ({
      value: user.id,
      label: user.login,
    }));
    setSelectOptions(options);
  };
  const debouncedOnSearchChange = useCallback(debounce(onSearchChange, 800), []);

  useEffect(() => {
    if (selectedOption) {
      onSelectUserId?.(selectedOption.value as string);
    }
  }, [selectedOption]);

  return (
    <div className="w-full flex flex-col">
      <Select
        showSearch
        labelInValue
        className={inputClassName}
        placeholder="Kullanıcı ara"
        value={value}
        onChange={(value) => onChange(value)}
        filterOption={false}
        options={selectOptions}
        onSearch={debouncedOnSearchChange}
        onSelect={(value, option) => setSelectedOption(option)}
      />
      <div className="flex flex-row items-center gap-2 mt-2">
        {selectOptions && selectedOption ? (
          <div className="flex flex-row items-center gap-1">
            <AvailableIcon className="w-6 h-6 text-success-500" />
            <span className="text-success-500">
              <span className="font-semibold">{selectedOption.label}</span> isimli müşteri sistemde mevcut, devam edebilirsiniz.
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserSearchInput;
