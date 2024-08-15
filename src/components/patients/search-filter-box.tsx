import { Radio, Space, Divider } from "antd";
import { CustomButton } from "../common";
import { PiX as ClearIcon } from "react-icons/pi";
import { useEffect, useState } from "react";

type Props = {
  onFilterChange: (filters: Record<string, string | undefined>) => void;
};

export const SearchFilterBox = ({ onFilterChange }: Props) => {
  const [filters, setFilters] = useState({
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
    <div className="grid grid-cols-1 gap-2 py-2 px-4 rounded-lg bg-gray-100/50 border border-gray-100">
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
