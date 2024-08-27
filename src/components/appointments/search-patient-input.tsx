import React, { useEffect, useMemo, useRef, useState } from "react";

import { PiSpinnerGapDuotone as LoadingIcon } from "react-icons/pi";

import { Avatar, Select, Spin } from "antd";
import debounce from "lodash/debounce";

import { useCustomAppQuery } from "@/hooks";
import { queries } from "@/services/db";
import { SearchPetResponse } from "@/services/db/queries/pet/searchPet";

import type { SelectProps } from "antd";

export interface SearchPatientInputProps<ValueType = any> extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  onSelectedValue?: (value: string | number | undefined) => void;
}

export function SearchPatientInput<ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any>({
  onSelectedValue,
  ...props
}: SearchPatientInputProps<ValueType>) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | number | undefined>();
  const [options, setOptions] = useState<ValueType[]>([]);

  const { data, loading } = useCustomAppQuery({
    query: queries.pet.SearchPet,
    options: {
      skip: !searchValue || searchValue.length < 2,
      variables: {
        _ilike: `%${searchValue}%`,
      },
    },
  });

  const formatData = (data?: SearchPetResponse["searchResults"]): ValueType[] => {
    return data?.map((pet) => ({
      key: pet?.id,
      value: pet?.id,
      label: pet?.name + " (" + pet?.clients?.[0]?.client?.user?.first_name + " " + pet?.clients?.[0]?.client?.user?.last_name + ")",
    })) as ValueType[];
  };

  const debouncedSearch = useMemo(() => debounce((value: string) => setSearchValue(value), 800), []);
  useEffect(() => {
    if (data) {
      setOptions(formatData(data?.searchResults));
    }
  }, [data]);

  const onSelect = (value: string | number | undefined) => {
    console.log(value);
    setSelectedValue(value);
    onSelectedValue?.(value);
  };

  return (
    <Select
      {...props}
      labelInValue
      showSearch
      allowClear
      filterOption={false}
      onSearch={(value) => debouncedSearch(value)}
      notFoundContent={loading ? <Spin className="w-full" indicator={<LoadingIcon className="animate-spin" />} /> : null}
      options={options}
      onSelect={(item) => onSelect(item.value)}
      labelRender={(option) => <span>{option.label}</span>}
      optionRender={(option) => {
        return (
          <div className="flex items-center justify-between">
            <span>{option.label}</span>
            {/* {option.data.data.type === "cat" ? <CatIcon className="text-yellow-800" /> : <DogIcon className="text-amber-800" />} */}
          </div>
        );
      }}
    />
  );
}
