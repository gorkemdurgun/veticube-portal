import React, { useEffect, useMemo, useState } from "react";

import { PiXCircleDuotone as CloseIcon } from "react-icons/pi";

import { Divider, Drawer, Form, Input, Select } from "antd";
import dayjs from "dayjs";

import { useAppDispatch } from "@/hooks";
import { createAppointmentRequest } from "@/redux/slices/appointment/appointmentSlice";

import { SearchPatientInput } from "@/components/appointments";
import SelectorDate from "@/components/appointments/selector-date";
import SelectorTime from "@/components/appointments/selector-time";
import CustomButton from "@/components/common/custom-button";

import type { SelectProps, FormRule } from "antd";

const dummyClinics: SelectProps["options"] = [
  {
    key: "clinic-1",
    value: "Clinic 1",
  },
  {
    key: "clinic-2",
    value: "Clinic 2",
  },
  {
    key: "clinic-3",
    value: "Clinic 3",
  },
  {
    key: "clinic-4",
    value: "Clinic 4",
  },
  {
    key: "clinic-5",
    value: "Clinic 5",
  },
];

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};
type FormValues = {
  date?: string;
  time?: string;
  patientId?: string;
  process?: AppointmentType;
  client?: string;
  clinic?: string;
  veterinarians?: string[];
  staffs?: string[];
  notes?: string;
};

const CreateAppointmentDrawer: React.FC<Props> = ({ visible, setVisible }) => {
  const dispatch = useAppDispatch();
  const [createForm] = Form.useForm<FormValues>();

  let disabledMinuteList: { hour: number; minute: number[] }[] = [];

  const handleCreate = () => {
    const values = createForm.getFieldsValue();
    if (!values.date || !values.time || !values.patientId || !values.process) return;

    dispatch(
      createAppointmentRequest({
        data: {
          pet_id: values.patientId,
          clinic_branch_id: "445d3c8a-5556-4e0c-a241-b0f253390087",
          appointment_date: values.date,
          appointment_time: values.time,
          appointment_type: values.process,
          notes: values.notes,
          appointment_staffs: [],
          appointment_veterinarians: [],
        },
      })
    );
  };

  const FormSection = ({ label, formItems, extras }: { label: string; formItems: JSX.Element[]; extras?: React.ReactNode }) => {
    const memoizedFormItems = useMemo(() => formItems, [formItems]);
    let formItemsParentClass = formItems.length > 1 ? "grid grid-cols-2 gap-4" : "flex flex-col";

    return (
      <div className="flex flex-col gap-1 py-1 px-4 rounded-md">
        <Divider className="!my-1" orientation="center">
          {label}
        </Divider>
        <div className={formItemsParentClass}>{memoizedFormItems.map((item) => item)}</div>
        {extras && extras}
      </div>
    );
  };

  return (
    <Drawer
      destroyOnClose
      placement="right"
      classNames={{
        body: "!p-0",
      }}
      closeIcon={<CloseIcon className="text-gray-700 text-2xl" />}
      title={
        <div className="flex items-center gap-2">
          <span className="text-md font-semibold">Create Appointment</span>
          <Select className="ml-auto w-1/2" showSearch options={dummyClinics} placeholder="Select a clinic" />
        </div>
      }
      keyboard={false}
      maskClosable={false}
      width={540}
      open={visible}
      onClose={() => setVisible(false)}
    >
      {/* <ProgressBar percent={percent} loadingSection={loadingSection} /> */}
      <Form form={createForm} className="m-4" layout="vertical">
        <div className="flex flex-col gap-2">
          <FormSection
            label="Hasta Bilgileri"
            formItems={[
              <Form.Item key="patientId" name="patientId" rules={[{ required: true, message: "Please select a patient" }]}>
                <SearchPatientInput
                  key="search-patient"
                  className="w-full"
                  size="large"
                  placeholder="Hasta ara..."
                  onSelectedValue={(value) => {
                    console.log("Selected Patient: ", value);
                    createForm.setFieldValue("patientId", value);
                  }}
                />
              </Form.Item>,
            ]}
            /*
            extras={
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-800">Quick Add Patient</span>
                <div className="overflow-x-auto flex gap-2">
                  <CustomButton
                    key="1"
                    variant="neutral-faded"
                    onClick={(e) => {
                      e.preventDefault();
                      createForm.setFieldValue("patient", "Veras");
                    }}
                  >
                    Veras
                  </CustomButton>
                  <CustomButton
                    key="2"
                    variant="neutral-faded"
                    onClick={(e) => {
                      e.preventDefault();
                      createForm.setFieldValue("patient", "Lime");
                    }}
                  >
                    Lime
                  </CustomButton>
                  <CustomButton
                    key="3"
                    variant="neutral-faded"
                    onClick={(e) => {
                      e.preventDefault();
                      createForm.setFieldValue("patient", "Milo");
                    }}
                  >
                    Milo
                  </CustomButton>
                  <CustomButton
                    key="4"
                    variant="neutral-faded"
                    onClick={(e) => {
                      e.preventDefault();
                      createForm.setFieldValue("patient", "Bella");
                    }}
                  >
                    Bella
                  </CustomButton>
                </div>
              </div>
            }
            */
          />
          <FormSection
            label="Randevu Tarihi"
            formItems={[
              <Form.Item key="date" name="date" rules={[{ required: true, message: "Please select a date" }]}>
                <SelectorDate
                  className="w-full"
                  size="large"
                  onDateChange={(formattedDate, unavailableMinutes) => {
                    createForm.setFieldsValue({ date: formattedDate });
                    createForm.resetFields(["time"]);
                    disabledMinuteList = unavailableMinutes;
                  }}
                />
              </Form.Item>,
              <Form.Item key="time" name="time" rules={[{ required: true, message: "Please select a time" }]}>
                <SelectorTime
                  className="w-full"
                  size="large"
                  disabled={!createForm.getFieldValue("date")}
                  needConfirm={false}
                  onChangeTime={(formattedTime) => createForm.setFieldValue("time", formattedTime)}
                  disabledTime={(date) => {
                    return {
                      disabledMinutes(hour) {
                        const found = disabledMinuteList.find((item) => item.hour === hour);
                        return found ? found.minute : [];
                      },
                    };
                  }}
                />
              </Form.Item>,
            ]}
          />
          <FormSection
            label="Process"
            formItems={[
              <Form.Item key="process" name="process" rules={[{ required: true, message: "Please select a process" }]}>
                <Select
                  className="w-full"
                  size="large"
                  placeholder="Select a process"
                  options={[
                    { label: "Surgery", value: "surgery" },
                    { label: "Vaccination", value: "vaccination" },
                    { label: "Consultation", value: "consultation" },
                    { label: "Grooming", value: "grooming" },
                    { label: "Dental", value: "dental" },
                    { label: "Hospitalization", value: "hospitalization" },
                  ]}
                />
              </Form.Item>,
            ]}
            extras={
              <div className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-gray-800">Quick Add Process</span>
                <div className="overflow-x-auto flex gap-2">
                  <CustomButton
                    key="1"
                    variant="neutral-faded"
                    onClick={(e) => {
                      e.preventDefault();
                      createForm.setFieldValue("process", "surgery");
                    }}
                  >
                    Surgery
                  </CustomButton>
                  <CustomButton
                    key="2"
                    variant="neutral-faded"
                    onClick={(e) => {
                      e.preventDefault();
                      createForm.setFieldValue("process", "vaccination");
                    }}
                  >
                    Vaccination
                  </CustomButton>
                  <CustomButton key="3" variant="neutral-faded" onClick={() => createForm.setFieldValue("process", "consultation")}>
                    Consultation
                  </CustomButton>
                </div>
              </div>
            }
          />
          {/* <FormSection
            label="Participants"
            formItems={[
              <Form.Item key="veterinarians" name="veterinarians" rules={[{ required: true, message: "Please select a veterinarian" }]}>
                <Select className="w-full" size="large" mode="multiple" placeholder="Select a veterinarian" />
              </Form.Item>,
              <Form.Item key="staffs" name="staffs" rules={[{ required: true, message: "Please select a staff" }]}>
                <Select className="w-full" size="large" mode="multiple" placeholder="Select a staff" />
              </Form.Item>,
            ]}
          /> */}
          <FormSection
            label="Notlar"
            formItems={[
              <Form.Item key="notes" name="notes">
                <Input.TextArea className="w-full" placeholder="Add notes" />
              </Form.Item>,
            ]}
          />
        </div>
        <CustomButton variant="primary-faded" className="w-full mt-4" onClick={handleCreate}>
          Create
        </CustomButton>
      </Form>
    </Drawer>
  );
};

export default CreateAppointmentDrawer;
