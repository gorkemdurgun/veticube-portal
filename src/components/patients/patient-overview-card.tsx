import { memo } from "react";
import { ComponentCard, CustomButton, TranslatedText } from "../common";
import { PiPenDuotone } from "react-icons/pi";

type Props = {};

const Component: React.FC<Props> = ({}) => {
  return (
    <ComponentCard
      header={{
        title: <TranslatedText tPrefix="components" tKey="patients.patient-information.header.title" />,
        extra: <CustomButton variant="primary-opaque" icon={PiPenDuotone} />,
      }}
    >
      <p>Some patient information</p>
    </ComponentCard>
  );
};

export const PatientOverviewCard = memo(Component);
