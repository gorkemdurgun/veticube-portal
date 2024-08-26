import React, { useEffect, useMemo, useRef, useState } from "react";

import { PiCat as CatIcon, PiDog as DogIcon } from "react-icons/pi";

import { Avatar, Select, Spin } from "antd";
import debounce from "lodash/debounce";

import { useCustomAppQuery } from "@/hooks";
import { queries } from "@/services/db";
import { SearchPetResponse } from "@/services/db/queries/pet/searchPet";

import type { SelectProps } from "antd";

export interface SearchPatientInputProps<ValueType = any> extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  onChangeValue: (value: ValueType | ValueType[]) => void;
}

export function SearchPatientInput<ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any>({
  onChangeValue,
  ...props
}: SearchPatientInputProps<ValueType>) {
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const { data, loading } = useCustomAppQuery({
    query: queries.pet.SearchPet,
    options: {
      skip: !searchValue || searchValue.length < 3,
      variables: {
        _ilike: `%${searchValue}%`,
      },
    },
  });

  const formatData = (data?: SearchPetResponse["searchResults"]): ValueType[] => {
    return data?.map((pet) => ({
      key: pet?.id,
      label: pet?.name,
      value: pet?.clients?.[0]?.client?.user?.first_name + " " + pet?.clients?.[0]?.client?.user?.last_name,
    })) as ValueType[];
  };

  const debouncedSearch = useMemo(() => debounce((value: string) => setSearchValue(value), 800), []);
  useEffect(() => {
    if (data) {
      setOptions(formatData(data?.searchResults));
    }
  }, [data]);

  return (
    <Select
      {...props}
      labelInValue
      showSearch
      allowClear
      filterOption={false}
      onSearch={(value) => debouncedSearch(value)}
      notFoundContent={loading ? <Spin size="small" /> : null}
      options={options}
      onChange={(value) => onChangeValue(value)}
      labelRender={(option) => (
        <div className="flex items-center gap-2">
          <span className="font-semibold">{option.label}</span>
          <span className="text-xs text-gray-500">{`(${option.value})`}</span>
        </div>
      )}
      optionRender={(option) => {
        return (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{option.label}</span>
              <span className="text-xs text-gray-500">{`(${option.value})`}</span>
            </div>

            {/* {option.data.data.type === "cat" ? <CatIcon className="text-yellow-800" /> : <DogIcon className="text-amber-800" />} */}
          </div>
        );
      }}
    />
  );
}
