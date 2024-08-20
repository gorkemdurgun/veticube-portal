import { memo } from "react";

import {
  PiPenDuotone as EditIcon,
  PiWhatsappLogo as WhatsappIcon,
  PiEnvelopeSimple as EmailIcon,
  PiCat as CatIcon,
  PiDog as DogIcon,
  PiGenderFemale as GenderFemaleIcon,
  PiGenderMale as GenderMaleIcon,
} from "react-icons/pi";

import { Avatar, Descriptions, Divider, Skeleton } from "antd";

import { calculator, converter } from "@/utils";

import type { DescriptionsProps } from "antd";

import { ComponentCard, CustomButton, TranslatedText } from "../common";

type Props = {
  loading?: boolean;
  pet?: {
    name?: string;
    chip_id?: string;
    pet_breed?: {
      breed?: string;
      species?: string;
    };
    gender?: string;
    neutralized?: boolean;
    birth_date?: string;
    client?: {
      user?: {
        first_name?: string;
        last_name?: string;
      };
    };
  };
};

const PatientOverviewCard: React.FC<Props> = ({ loading, pet }) => {
  let classColor = pet?.gender === "M" ? "bg-blue-200 text-blue-800" : "bg-pink-200 text-pink-800";
  let genderIcon =
    pet?.gender === "M" ? <GenderMaleIcon className="w-4 h-4 text-blue-800" /> : <GenderFemaleIcon className="w-4 h-4 text-pink-800" />;
  let species = pet?.pet_breed?.breed === "Cat" ? <CatIcon className="w-8 h-8" /> : <DogIcon className="w-8 h-8" />;
  // let age = new Date().getFullYear() - new Date(pet?.birthDate).getFullYear();

  const items: DescriptionsProps["items"] = [
    {
      label: <span>Neutered</span>,
      children: <span>{pet?.neutralized ? "Yes" : "No"}</span>,
      span: 1,
    },
    {
      label: <span>Microchip</span>,
      children: <span>{`${pet?.chip_id ? pet?.chip_id : "-"}`}</span>,
      span: 1,
    },
    {
      label: <span>Owner</span>,
      children: (
        <div className="flex items-center justify-between gap-2">
          <span>{`${pet?.client?.user?.first_name} ${pet?.client?.user?.last_name}`}</span>
          <div className="flex gap-2">
            <CustomButton variant="primary-text" icon={EmailIcon} />
            <CustomButton variant="primary-text" icon={WhatsappIcon} />
          </div>
        </div>
      ),
      span: 2,
    },
  ];

  const LoadingSkeleton = () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Skeleton.Avatar active size={64} shape="square" />
        <div className="flex flex-col justify-around">
          <Skeleton.Input active style={{ height: 30 }} />
          <Skeleton.Input active style={{ height: 20 }} />
        </div>
        <div className="ml-auto flex flex-col items-end justify-around">
          <Skeleton.Input active style={{ height: 30 }} />
          <Skeleton.Input active style={{ height: 20 }} />
        </div>
      </div>
      <Divider className="my-2" />
      <Skeleton active title={false} paragraph={{ rows: 3 }} />
    </div>
  );

  return (
    <ComponentCard
      header={{
        title: <TranslatedText tPrefix="components" tKey="patients.patient-information.header.title" />,
        extra: <CustomButton variant="primary-faded" icon={EditIcon} />,
      }}
    >
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Avatar shape="square" className={`bg-gray-50 text-gray-700 h-16 w-16`} icon={species} />
            <div className="flex flex-col justify-around">
              <h3 className="text-2xl font-semibold">{pet?.name}</h3>
              <div className="flex items-center gap-2">
                <div className={`flex items-center p-1 rounded-md ${classColor}`}>{genderIcon}</div>
                <span className="text-gray-900">{converter.data.getSpecies(pet?.pet_breed?.species)}</span>
                <Divider rootClassName="mx-0" type="vertical" className="border-gray-700" />
                <span className="text-gray-700">{converter.string.cleanUnderline(pet?.pet_breed?.breed)}</span>
              </div>
            </div>
            <div className="ml-auto flex flex-col items-end justify-around">
              {/* <h2 className="text-3xl font-semibold">{age + " years"}</h2> */}
              <span className="text-gray-500">{calculator.age.spesificAge(pet?.birth_date)}</span>
            </div>
          </div>
          <Divider className="my-2" />
          <Descriptions column={2} size="small" bordered items={items} />
        </div>
      )}
    </ComponentCard>
  );
};

export default memo(PatientOverviewCard);
