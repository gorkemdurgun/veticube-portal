import { memo } from "react";
import { ComponentCard, CustomButton, TranslatedText } from "../common";
import {
  PiPenDuotone as EditIcon,
  PiWhatsappLogo as WhatsappIcon,
  PiEnvelopeSimple as EmailIcon,
  PiCat as CatIcon,
  PiDog as DogIcon,
  PiGenderFemale as GenderFemaleIcon,
  PiGenderMale as GenderMaleIcon,
} from "react-icons/pi";
import { Avatar, Descriptions, Divider } from "antd";
import type { DescriptionsProps } from "antd";

type Props = {
  pet: {
    name: string;
    gender: string;
    species: string;
    breed: string;
    birthDate: string;
    isNeutered: boolean;
    microchip: string;
    owner: string;
    ownerPhone: string;
    ownerEmail: string;
  };
};

const Component: React.FC<Props> = ({ pet }) => {
  let classColor = pet.gender === "M" ? "bg-blue-200 text-blue-800" : "bg-pink-200 text-pink-800";
  let genderIcon =
    pet.gender === "M" ? <GenderMaleIcon className="w-4 h-4 text-blue-800" /> : <GenderFemaleIcon className="w-4 h-4 text-pink-800" />;
  let species = pet.species === "Cat" ? <CatIcon className="w-8 h-8" /> : <DogIcon className="w-8 h-8" />;
  let age = new Date().getFullYear() - new Date(pet.birthDate).getFullYear();

  const items: DescriptionsProps["items"] = [
    {
      label: <span>Neutered</span>,
      children: <span>{pet.isNeutered ? "Yes" : "No"}</span>,
      span: 1,
    },
    {
      label: <span>Microchip</span>,
      children: <span>{pet.microchip}</span>,
      span: 1,
    },
    {
      label: <span>Owner</span>,
      children: (
        <div className="flex items-center justify-between gap-2">
          <span>{pet.owner}</span>
          <div className="flex gap-2">
            <CustomButton variant="primary-text" icon={EmailIcon} />
            <CustomButton variant="primary-text" icon={WhatsappIcon} />
          </div>
        </div>
      ),
      span: 2,
    },
  ];

  return (
    <ComponentCard
      header={{
        title: <TranslatedText tPrefix="components" tKey="patients.patient-information.header.title" />,
        extra: <CustomButton variant="primary-opaque" icon={EditIcon} />,
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Avatar shape="square" className={`bg-gray-50 text-gray-700 h-16 w-16`} icon={species} />
          <div className="flex flex-col justify-around">
            <h3 className="text-2xl font-semibold">{pet.name}</h3>
            <div className="flex items-center gap-2">
              <div className={`flex items-center p-1 rounded-md ${classColor}`}>{genderIcon}</div>
              <span className="text-gray-900">{pet.species}</span>
              <Divider rootClassName="mx-0" type="vertical" className="border-gray-700" />
              <span className="text-gray-700">{pet.breed}</span>
            </div>
          </div>
          <div className="ml-auto flex flex-col items-end justify-around">
            <h2 className="text-3xl font-semibold">{age + " years"}</h2>
            <span className="text-gray-500">{`(${pet.birthDate})`}</span>
          </div>
        </div>
        <Divider className="my-2"/>
        <Descriptions column={2} size="small" bordered items={items} />
      </div>
    </ComponentCard>
  );
};

export const PatientOverviewCard = memo(Component);
