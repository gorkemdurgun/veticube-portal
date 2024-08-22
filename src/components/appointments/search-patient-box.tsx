import React, { useMemo, useRef, useState } from "react";

import { PiCat as CatIcon, PiDog as DogIcon } from "react-icons/pi";

import { Avatar, Select, Spin } from "antd";
import debounce from "lodash/debounce";

import type { SelectProps } from "antd";


export interface SearchPatientBoxProps<ValueType = any> extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions?: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

export function SearchPatientBox<ValueType extends { key?: string; label: React.ReactNode; value: string | number } = any>({
  fetchOptions,
  debounceTimeout = 800,
  ...props
}: SearchPatientBoxProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      if (!fetchOptions) {
        return;
      }
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      {...props}
      labelInValue
      showSearch
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      options={options}
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

            {option.data.data.type === "cat" ? <CatIcon className="text-yellow-800" /> : <DogIcon className="text-amber-800" />}
          </div>
        );
      }}
    />
  );
}
