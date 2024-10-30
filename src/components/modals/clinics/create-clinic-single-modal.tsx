
import { Divider, Form, Input, message, Modal } from "antd";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { createClinicRequest } from "@/redux/slices/clinic/clinicSlice";

import { TranslatedText } from "../../common";

type CreateClinicSingleModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

type ClinicFormValues = {
  name: string;
  branch: {
    name: string;
    city: string;
    address?: string;
    phone_number?: string;
  };
};

const CreateClinicSingleModal: React.FC<CreateClinicSingleModalProps> = ({ visible, setVisible }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.clinic);
  const [createClinicForm] = Form.useForm<ClinicFormValues>();

  // const { refetch: refetchClinics } = useQuery(queries.clinic.GetClinics);

  const handleOk = () => {
    const clinicValues = createClinicForm.getFieldsValue();
    const branchValues = clinicValues.branch;

    createClinicForm.validateFields().then(() => {
      dispatch(
        createClinicRequest({
          name: clinicValues.name,
          branch: {
            name: clinicValues?.name + " - (Base)",
            city: branchValues?.city,
            address: branchValues?.address,
            phone_number: branchValues?.phone_number,
          },
          onSuccess: () => {
            setVisible(false);
            // refetchClinics();
          },
          onError: (error) => {
            message.error({
              content: error,
              duration: 5,
            });
          },
        })
      );
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      title={
        <div className="flex flex-col items-center text-center gap-2">
          <TranslatedText className="text-2xl font-semibold" tPrefix="components" tKey="modals.create-clinic-single.title" />
          <TranslatedText className="text-sm text-gray-400 font-normal" tPrefix="components" tKey="modals.create-clinic-single.subtitle" />
          <Divider className="my-2" />
        </div>
      }
    >
      <Form layout="vertical" form={createClinicForm}>
        <Form.Item
          required
          name="name"
          label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-single.form.name" />}
          rules={[{ required: true, message: "Please enter clinic name" }]}
        >
          <Input placeholder="Clinic Name" />
        </Form.Item>
        <Form.Item
          required
          name={["branch", "city"]}
          label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-single.form.city" />}
          rules={[{ required: true, message: "Please enter city" }]}
        >
          <Input placeholder="City" />
        </Form.Item>
        <Form.Item name={["branch", "address"]} label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-single.form.address" />}>
          <Input placeholder="Address" />
        </Form.Item>
        <Form.Item
          name={["branch", "phone_number"]}
          label={<TranslatedText tPrefix="components" tKey="modals.create-clinic-single.form.phone" />}
        >
          <Input placeholder="Phone" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateClinicSingleModal;
