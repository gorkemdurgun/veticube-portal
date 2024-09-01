import { useEffect, useState } from "react";

import { PiX as ClearIcon } from "react-icons/pi";

import { Radio, Space, Divider, DatePicker } from "antd";
import dayjs from "dayjs";

import CustomButton from "@/components/common/custom-button";

type Props = {
  onFilterChange: (filters: Record<string, string | undefined>) => void;
};

const SearchFilterBox = ({ onFilterChange }: Props) => {
  const [filters, setFilters] = useState({
    date: undefined,
    whereabout: undefined,
    species: undefined,
    gender: undefined,
    age: undefined,
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleFilterClear = (key: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: undefined,
    }));
  };

  const onApplyFilters = () => {
    onFilterChange(filters);
  };

  return (
    <div className="h-fit grid grid-cols-1 gap-2 py-2 px-4 rounded-lg bg-gray-100 border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-800">Filters</h4>
      <Divider className="my-2" />
      <div className="flex flex-col gap-2">
        <h5 className="text-sm text-gray-500">Last Arrival</h5>
        <DatePicker className="w-full" format="DD/MM/YYYY" onChange={(date) => handleFilterChange("date", dayjs(date).format("YYYY-MM-DD"))} />
      </div>
      <Divider className="my-2" />
      <Radio.Group disabled value={filters.whereabout} onChange={(e) => handleFilterChange("whereabout", e.target.value)}>
        <div className="flex justify-between items-center mb-1">
          <h5 className="text-sm text-gray-500">Whereabout</h5>
          {filters.whereabout && (
            <CustomButton size="xs" variant="neutral-text" icon={ClearIcon} onClick={() => handleFilterClear("whereabout")}>
              Clear Filter
            </CustomButton>
          )}
        </div>
        <Space className="grid grid-cols-1 lg:grid-cols-1 gap-2" direction="vertical">
          <Radio value="care">In Care</Radio>
          <Radio value="icu">In ICU</Radio>
        </Space>
      </Radio.Group>
      <Divider className="my-2" />
      <Radio.Group value={filters.species} onChange={(e) => handleFilterChange("species", e.target.value)}>
        <div className="flex justify-between items-center mb-1">
          <h5 className="text-sm text-gray-500">Species</h5>
          {filters.species && (
            <CustomButton size="xs" variant="neutral-text" icon={ClearIcon} onClick={() => handleFilterClear("species")}>
              Clear Filter
            </CustomButton>
          )}
        </div>
        <Space className="grid grid-cols-1 lg:grid-cols-1 gap-2" direction="vertical">
          <Radio value="cat">Cat</Radio>
          <Radio value="dog">Dog</Radio>
        </Space>
      </Radio.Group>
      <Divider className="my-2" />
      <Radio.Group value={filters.gender} onChange={(e) => handleFilterChange("gender", e.target.value)}>
        <div className="flex justify-between items-center mb-1">
          <h5 className="text-sm text-gray-500">Gender</h5>
          {filters.gender && (
            <CustomButton size="xs" variant="neutral-text" icon={ClearIcon} onClick={() => handleFilterClear("gender")}>
              Clear Filter
            </CustomButton>
          )}
        </div>
        <Space className="grid grid-cols-1 lg:grid-cols-1 gap-2" direction="vertical">
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </Space>
      </Radio.Group>
      <Divider className="my-2" />
      <Radio.Group value={filters.age} onChange={(e) => handleFilterChange("age", e.target.value)}>
        <div className="flex justify-between items-center mb-1">
          <h5 className="text-sm text-gray-500">Age</h5>
          {filters.age && (
            <CustomButton size="xs" variant="neutral-text" icon={ClearIcon} onClick={() => handleFilterClear("age")}>
              Clear Filter
            </CustomButton>
          )}
        </div>
        <Space className="grid grid-cols-1 lg:grid-cols-1 gap-2" direction="vertical">
          <Radio value="0-1">0-1 years</Radio>
          <Radio value="1-5">1-5 years</Radio>
          <Radio value="5-10">5-10 years</Radio>
          <Radio value="10+">10+ years</Radio>
        </Space>
      </Radio.Group>
      <Divider className="my-2" />
      <CustomButton variant="primary-faded" onClick={() => onApplyFilters()}>
        Apply Filters
      </CustomButton>
    </div>
  );
};

export default SearchFilterBox;
