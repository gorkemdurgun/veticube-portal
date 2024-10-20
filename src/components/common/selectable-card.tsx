import { PiX as CrossIcon } from "react-icons/pi";

import { Card } from "antd";

import CustomButton from "./custom-button";

type Props = {
  children: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  onClear?: () => void;
};

const SelectableCard = ({ children, selected, onClick, onClear }: Props) => {
  const onClickCard = () => {
    if (selected) {
      return;
    } else {
      onClick();
    }
  };

  return (
    <div className="relative">
      {selected && onClear && (
        <CustomButton variant="neutral-opaque" size="xs" className="!z-10 absolute -top-1 -right-1" onClick={onClear}>
          <CrossIcon size={12} />
        </CustomButton>
      )}
      <Card
        className={
          "cursor-pointer flex items-center justify-center border-2 transition-all hover:border-blue-600" +
          (selected ? " bg-blue-50 border-blue-600 text-blue-600" : "")
        }
        onClick={onClickCard}
      >
        {children}
      </Card>
    </div>
  );
};

export default SelectableCard;
