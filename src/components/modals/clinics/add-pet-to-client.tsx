import { useEffect, useState } from "react";

import { PiCatDuotone as CatIcon, PiDogDuotone as DogIcon, PiGenderFemale as FemaleIcon, PiGenderMale as MaleIcon } from "react-icons/pi";

import { AutoComplete, Card, Checkbox, DatePicker, Divider, Form, Input, InputNumber, message, Modal, Radio, Select, Steps } from "antd";

import { useAppSelector } from "@/hooks";
import { mutations } from "@/services/db";
import { uiError } from "@/utils/uiError";

import CustomButton from "@/components/common/custom-button";
import SelectableCard from "@/components/common/selectable-card";

const { Option } = Select;

type Props = {
  visible: boolean;
  onClose: () => void;
  data: {
    clients: any[];
    initialClient?: string;
  };
};

type PetForm = {
  owner_id: string;
  name: string;
  breed_id?: string;
  gender?: string;
  birthDate?: string;
  weight?: number;
  medicalNotes?: string;
};

const AddPetToClient = ({ visible, onClose, data }: Props) => {
  const [loading, setLoading] = useState(false);
  const { breeds } = useAppSelector((state) => state.app);

  const [selectedSpecies, setSelectedSpecies] = useState<string | undefined>(undefined);
  const [petForm] = Form.useForm<PetForm>();

  const handleSubmit = () => {
    petForm.validateFields().then((values) => {
      mutations.clinics
        .addPetToClient(values.owner_id, values.name, values.breed_id, values.gender, values.birthDate, values.medicalNotes)
        .then(
          () => {
            message.success("Pet başarıyla eklendi.");
            onClose();
          },
          (error) => {
            uiError(error);
          }
        );
    });
  };

  useEffect(() => {
    // reset breed field when species changes
    petForm.setFieldsValue({ breed_id: undefined });
  }, [selectedSpecies]);

  return (
    <Modal open={visible} onOk={onClose} onCancel={onClose} footer={null} title="Pet Ekle">
      <Form form={petForm} layout="vertical">
        <Form.Item label="Sahip" name="owner_id" rules={[{ required: true, message: "Lütfen sahip seçin" }]} initialValue={data?.initialClient}>
          <Select showSearch optionFilterProp="title">
            {data?.clients?.map((client) => (
              <Option key={client.id} value={client.id} title={client.full_name}>
                {client.full_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Ad" name="name" rules={[{ required: true, message: "Lütfen pet adını girin." }]}>
          <Input />
        </Form.Item>
        <div className="flex flex-col gap-2 my-2">
          <h5 className="text-xs text-error-600">
            *<span className="ml-1 text-sm text-black">Tür</span>
          </h5>
          <div className="grid grid-cols-2 gap-4">
            <SelectableCard
              selected={selectedSpecies === "Dog"}
              onClick={() => setSelectedSpecies("Dog")}
              onClear={() => setSelectedSpecies(undefined)}
            >
              <DogIcon size={32} />
              <span>Köpek</span>
            </SelectableCard>
            <SelectableCard
              selected={selectedSpecies === "Cat"}
              onClick={() => setSelectedSpecies("Cat")}
              onClear={() => setSelectedSpecies(undefined)}
            >
              <CatIcon size={32} />
              <span>Kedi</span>
            </SelectableCard>
          </div>
        </div>
        <Form.Item label="Cins" name="breed_id">
          <Select
            showSearch
            disabled={!selectedSpecies}
            optionFilterProp="title"
            onSelect={(value, option) => {
              petForm.setFieldsValue({ breed_id: option?.value as string });
            }}
          >
            {breeds
              .filter((breed) => breed.species_name === selectedSpecies)
              .map((breed) => (
                <Option key={breed.id} value={breed.id} title={breed.name}>
                  {breed.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Cinsiyet" name="gender">
          <Radio.Group
            className="w-full"
            optionType="button"
            options={[
              {
                style: { width: "50%" },
                label: "Erkek",
                value: "male",
              },
              {
                style: { width: "50%" },
                label: "Dişi",
                value: "female",
              },
            ]}
          />
        </Form.Item>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item label="Doğum Tarihi" name="birthDate">
            <DatePicker className="w-full" format={"YYYY-MM-DD"} />
          </Form.Item>
          <Form.Item label="Ağırlık" name="weight">
            <InputNumber disabled step={0.1} className="w-full" />
          </Form.Item>
        </div>
        <Form.Item label="Notlar" name="medicalNotes">
          <Input.TextArea />
        </Form.Item>
        <Divider />
        <Form.Item>
          <CustomButton className="w-full" variant="secondary-faded" loading={loading} onClick={handleSubmit}>
            Devam Et
          </CustomButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPetToClient;
