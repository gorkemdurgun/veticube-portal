import { useEffect, useState } from "react";

import { PiCatDuotone as CatIcon, PiDogDuotone as DogIcon } from "react-icons/pi";

import { useMutation } from "@apollo/client";
import { DatePicker, Divider, Form, Input, InputNumber, message, Modal, Radio, Select } from "antd";

import breedsJson from "@/constants/breeds.json";
import { useAppSelector } from "@/hooks";
import { clinicMutations } from "@/services/apollo/mutation";

import CustomButton from "@/components/common/custom-button";
import SelectableCard from "@/components/common/selectable-card";

const { Option } = Select;

type Props = {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  data: {
    clients: any;
    initialClientId?: string;
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

const AddPetToClient = ({ visible, onClose, onSuccess, data }: Props) => {
  const [loading, setLoading] = useState(false);

  const [selectedSpecies, setSelectedSpecies] = useState<string | undefined>(undefined);
  const [petForm] = Form.useForm<PetForm>();

  const [addPetMutation] = useMutation(clinicMutations.addPetToClient);

  const handleSubmit = () => {
    petForm.validateFields().then((values) => {
      setLoading(true);
      addPetMutation({
        variables: {
          client_id: values.owner_id,
          name: values.name,
          birthdate: values.birthDate,
          breed_id: values.breed_id,
          gender_id: values.gender,
        },
      })
        .then(() => {
          message.success("Pet başarıyla eklendi");
          setLoading(false);
          onClose();
          if (onSuccess) {
            onSuccess();
          }
        })
        .catch((error) => {
          message.error(error.message);
          setLoading(false);
        });
    });
  };

  useEffect(() => {
    // reset breed field when species changes
    petForm.setFieldsValue({ breed_id: undefined });
  }, [selectedSpecies]);

  useEffect(() => {
    petForm.setFieldsValue({ owner_id: data.initialClientId });
  }, [data.initialClientId]);

  return (
    <Modal open={visible} onOk={onClose} onCancel={onClose} footer={null} title="Pet Ekle">
      <Form form={petForm} layout="vertical" initialValues={{ owner_id: data.initialClientId }}>
        <Form.Item label="Sahip" name="owner_id">
          <Select defaultValue={data.initialClientId || null} showSearch optionFilterProp="title">
            <Option value={null} title="Sahipsiz">
              <span className="italic text-warning-600">Sahipsiz</span>
            </Option>
            {data?.clients?.map((client: any) => (
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
          <span className="text-sm text-black">Tür</span>
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
            {breedsJson.breeds
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
                style: { width: "33.33%" },
                label: "Erkek",
                value: "1",
              },
              {
                style: { width: "33.33%" },
                label: "Dişi",
                value: "2",
              },
              {
                style: { width: "33.33%" },
                label: "Belirsiz",
                value: "3",
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
          <CustomButton className="w-full" variant="primary-opaque" loading={loading} onClick={handleSubmit}>
            Devam Et
          </CustomButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddPetToClient;
