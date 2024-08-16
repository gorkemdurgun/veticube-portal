import Image from "next/image";
import { IconType } from "react-icons";
import { CustomButton } from "../common";

type Props = {
  image: string;
  label: string;
  count: number;
  button?: {
    icon: IconType;
    onClick: () => void;
  };
};

export const PatientListHeaderCard = ({ image, label, count, button }: Props) => {
  return (
    <div className="flex items-center justify-start gap-4 pl-2 p-4 rounded-md bg-white shadow-basic">
      <Image src={image} width={64} height={64} alt="Active Patients" />
      <div className="flex flex-col items-start gap-1">
        <h4 className="text-sm text-gray-500">{label}</h4>
        <span className="text-2xl font-semibold">{count}</span>
      </div>
      {button && <CustomButton size="md" variant="neutral-faded" className="ml-auto" icon={button.icon} onClick={button.onClick} />}
    </div>
  );
};
