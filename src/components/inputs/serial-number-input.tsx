import React from "react";

import { Input } from "antd";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SerialNumberInput: React.FC<Props> = ({ value, onChange }) => {
  // Every 4 characters, add a hyphen
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const formattedValue = value
      .replace(/[^a-zA-Z0-9]/g, "") // Allow only letters and numbers
      .replace(/(.{4})/g, "$1-")
      .slice(0, 19);

    onChange(formattedValue);
  };

  return <Input placeholder="XXXX-XXXX-XXXX-XXXX" value={value} onChange={handleOnChange} maxLength={19} />;
};

export default SerialNumberInput;
