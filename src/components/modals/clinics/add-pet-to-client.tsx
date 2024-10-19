import { useEffect, useState } from "react";

import { PiCatDuotone as CatIcon, PiDogDuotone as DogIcon } from "react-icons/pi";

import { AutoComplete, Card, Checkbox, Divider, Form, Input, message, Modal, Select, Steps } from "antd";

import { useAppSelector } from "@/hooks";
import { mutations } from "@/services/db";
import { uiError } from "@/utils/uiError";

import CustomButton from "@/components/common/custom-button";

const { Option } = Select;

type Props = {
  visible: boolean;
  onClose: () => void;
  ownerId?: string;
};

type PetForm = {
  owner_id: string;
  name: string;
  breed?: string;
  gender?: string;
  birthDate?: string;
  weight?: number;
  chipNumber?: string;
};

const AddPetToClient = ({ visible, onClose, ownerId }: Props) => {
  const [loading, setLoading] = useState(false);
  const { breeds } = useAppSelector((state) => state.app);

  const [selectedSpecies, setSelectedSpecies] = useState<string | undefined>(undefined);
  const [petForm] = Form.useForm<PetForm>();

  const handleSubmit = () => {
    petForm.validateFields().then((values) => {
      console.log("values", values);
    });
  };

  useEffect(() => {
    // reset breed field when species changes
    petForm.setFieldsValue({ breed: undefined });
  }, [selectedSpecies]);

  return (
    <Modal title="Pet Ekle" open={true} onOk={onClose} onCancel={onClose} footer={null}>
      <Form form={petForm} layout="vertical">
        <Form.Item name="owner_id" initialValue={ownerId} hidden>
          <Input />
        </Form.Item>
        <Form.Item label="Ad" name="name" rules={[{ required: true, message: "Lütfen pet adını girin." }]}>
          <Input />
        </Form.Item>
        <div className="flex flex-col gap-2 my-2">
          <h5 className="text-xs text-error-600">
            *<span className="ml-1 text-sm text-black">Tür</span>
          </h5>
          <div className="grid grid-cols-2 gap-4">
            <Card
              className={
                "cursor-pointer flex items-center justify-center border-2 hover:border-blue-600" +
                (selectedSpecies === "Dog" ? " bg-blue-50 border-blue-600 text-blue-600" : "")
              }
              onClick={() => setSelectedSpecies("Dog")}
            >
              <DogIcon size={32} />
              <span>Köpek</span>
            </Card>
            <Card
              className={
                "cursor-pointer flex items-center justify-center border-2 hover:border-blue-600" +
                (selectedSpecies === "Cat" ? " bg-blue-50 border-blue-600 text-blue-600" : "")
              }
              onClick={() => setSelectedSpecies("Cat")}
            >
              <CatIcon size={32} />
              <span>Kedi</span>
            </Card>
          </div>
        </div>
        <Form.Item label="Cins" name="breed" rules={[{ required: true, message: "Lütfen pet cinsini girin." }]}>
          <Select
            showSearch
            disabled={!selectedSpecies}
            optionFilterProp="title"
            onSelect={(value, option) => {
              petForm.setFieldsValue({ breed: option?.value as string });
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
