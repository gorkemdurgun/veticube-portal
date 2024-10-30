import { useEffect, useState } from "react";

import { PiCheckCircleDuotone as AvailableIcon, PiWarningCircle as ExistIcon, PiScanDuotone as ScanIcon } from "react-icons/pi";

import { AutoComplete, Spin } from "antd";

import CustomButton from "./custom-button";

import type { AutoCompleteProps } from "antd";

type Props = {
  value: string;
  onChange: (value: string) => void;
  scannable?: boolean;
  onScanned?: (value: boolean | null) => void;
  inputClassName?: string;
};

const EmailInput: React.FC<Props> = ({ value, onChange, scannable, onScanned, inputClassName }) => {
  const [scanLoading, setScanLoading] = useState(false);
  const [userAlreadyExists, setUserAlreadyExists] = useState<boolean | null>(null);
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<AutoCompleteProps["options"]>([]);

  const handleSearch = (value: string) => {
    setAutoCompleteOptions(() => {
      if (!value || value.includes("@")) {
        return [];
      }
      return ["gmail.com", "hotmail.com", "outlook.com"].map((domain) => ({
        label: `${value}@${domain}`,
        value: `${value}@${domain}`,
      }));
    });
  };

  const scanUser = () => {
    setScanLoading(true);
    setTimeout(() => {
      const isUserExists = Math.random() < 0.5;

      setUserAlreadyExists(isUserExists);
      onScanned?.(isUserExists);
      setScanLoading(false);
    }, 2000);
  };

  useEffect(() => {
    setUserAlreadyExists(null);
  }, [value]);

  return (
    <Spin spinning={scanLoading}>
      <div className="w-full flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <AutoComplete
            className={inputClassName}
            disabled={scanLoading}
            placeholder="Email adresini girin"
            value={value}
            onChange={(value) => onChange(value)}
            options={autoCompleteOptions}
            onSearch={handleSearch}
          />
          {scannable && (
            <CustomButton
              disabled={scanLoading || userAlreadyExists !== null || value === ""}
              size="sm"
              className="px-4 "
              variant="secondary-faded"
              onClick={scanUser}
            >
              <ScanIcon className="w-5 h-5" />
            </CustomButton>
          )}
        </div>
        {scannable && (
          <div className="flex flex-row items-center gap-2 mt-2">
            {userAlreadyExists === true ? (
              <div className="flex flex-row items-center gap-1">
                <ExistIcon className="w-6 h-6 text-warning-500" />
                <span className="text-warning-500">Kullanıcı zaten sistemde mevcut</span>
              </div>
            ) : userAlreadyExists === false ? (
              <div className="flex flex-row items-center gap-1">
                <AvailableIcon className="w-6 h-6 text-success-500" />
                <span className="text-success-500">Kullanıcı için hesap oluşturulabilir</span>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </Spin>
  );
};

export default EmailInput;
