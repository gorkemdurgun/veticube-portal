import { useCallback, useEffect, useState } from "react";

import { PiScanDuotone as ScanIcon, PiCheckCircleDuotone as AvailableIcon, PiWarningCircle as ExistIcon } from "react-icons/pi";

import { useQuery } from "@apollo/client";
import { Select, Spin } from "antd";
import { debounce } from "lodash";

import { queries } from "@/services/db";

import CustomButton from "./custom-button";

import type { SelectProps } from "antd";
import type { DefaultOptionType } from "rc-select/lib/Select";

type SelectedClient = {
  id: string;
  name: string;
  pets: { id: string; name: string }[];
};

type Props = {
  inputClassName?: string;
  onSelectClient?: (client: SelectedClient) => void;
};

const UserSearchInput: React.FC<Props> = ({ inputClassName, onSelectClient }) => {
  const [value, onChange] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<DefaultOptionType | null>(null);
  const [selectOptions, setSelectOptions] = useState<SelectProps["options"]>([]);

  const { data, refetch } = useQuery(queries.clinic.SearchBranchClient);

  const onSearchChange = async (searchText: string) => {
    if (!searchText || searchText.length < 3) return;
    await refetch({ term: `%${searchText}%` });
  };
  const debouncedOnSearchChange = useCallback(debounce(onSearchChange, 300), []);

  useEffect(() => {
    if (data?.records) {
      setSelectOptions(
        data.records.map((record) => ({
          label: record.full_name,
          value: record.id,
          data: record,
        }))
      );
    }
  }, [data]);

  useEffect(() => {
    if (selectedOption) {
      onSelectClient?.({
        id: selectedOption.value as string,
        name: selectedOption.label as string,
        pets: selectedOption.data.pets.map((pet: any) => ({ id: pet.id, name: pet.name })),
      });
    }
  }, [selectedOption]);

  return (
    <div className="w-full flex flex-col">
      {/* <div className="flex flex-row items-center gap-2"> */}
        <Select
          showSearch
          labelInValue
          className={inputClassName}
          placeholder="Müşteri adı, email veya hayvan adı ile arama yapın"
          value={value}
          onChange={(value) => onChange(value)}
          filterOption={false}
          options={selectOptions}
          onSearch={debouncedOnSearchChange}
          onSelect={(value, option) => setSelectedOption(option)}
        />
        {/* <CustomButton variant="secondary-faded" className="w-full text-left">
          + Yeni Müşteri Ekle
        </CustomButton> */}
      {/* </div> */}
      {/* <div className="flex flex-row items-center gap-2 mt-2">
        {selectOptions && selectedOption ? (
          <div className="flex flex-row items-center gap-1">
            <AvailableIcon className="w-6 h-6 text-success-500" />
            <span className="text-success-500">
              <span className="font-semibold">{selectedOption.label}</span> isimli müşteri sistemde mevcut, devam edebilirsiniz.
            </span>
          </div>
        ) : null}
      </div> */}
    </div>
  );
};

export default UserSearchInput;
