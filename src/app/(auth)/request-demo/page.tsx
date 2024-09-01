"use client";

import React, { useState } from "react";

import {
  PiUserDuotone as ManageClientsIcon,
  PiDogDuotone as ManagePatientsIcon,
  PiStorefrontDuotone as BranchesIcon,
  PiDeviceTabletDuotone as DevicesIcon,
  PiHeadCircuitDuotone as AiIcon,
  PiCalendarDotsDuotone as AppointmentsIcon,
  PiPackageDuotone as StockIcon,
  PiChartBarDuotone as ReportsIcon,
} from "react-icons/pi";

import { Badge, Card, Checkbox, Divider, Form, Input, Image, Steps, message, Select } from "antd";
import { IconType } from "react-icons";

import citiesJson from "@/constants/cities.json";
import { mutations } from "@/services/db";

import { CustomButton } from "@/components/common";

type RequestDemoFormStep0 = {
  clinic_name: string;
  city: string;
  district: string;
  address: string;
  services_offered: string[];
};
type RequestDemoFormStep1 = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  active_softwares?: string[];
  feedback_channel: string[];
};

const RequestDemoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [requestDemoFormStep0] = Form.useForm<RequestDemoFormStep0>();
  const [requestDemoFormStep1] = Form.useForm<RequestDemoFormStep1>();

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [sendSuccess, setSendSuccess] = useState<boolean>(false);
  const [sendError, setSendError] = useState<boolean>(false);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  const handleCompleteStep0 = () => {
    requestDemoFormStep0.validateFields().then(() => setActiveTab(activeTab + 1));
  };
  const handleCompleteStep1 = () => {
    requestDemoFormStep1.validateFields().then((values) => {
      mutations.requests
        .createDemoRequest(
          requestDemoFormStep0.getFieldValue("clinic_name"),
          requestDemoFormStep0.getFieldValue("city"),
          requestDemoFormStep0.getFieldValue("district"),
          requestDemoFormStep0.getFieldValue("address"),
          requestDemoFormStep0.getFieldValue("services_offered"),
          values.first_name,
          values.last_name,
          values.email,
          values.phone,
          values.feedback_channel,
          values.active_softwares
        )
        .then(() => {
          requestDemoFormStep0.resetFields();
          requestDemoFormStep1.resetFields();
          setSendSuccess(true);
        })
        .catch((err) => {
          setSendError(true);
          if (err?.message?.includes("duplicate key")) {
            message.error("You have already submitted a request, we accelerate the process");
          } else {
            message.error("Something went wrong, please contact us on our email");
          }
        });
    });
  };

  const FeatureCard: React.FC<{
    title: string;
    description: string;
    icon: IconType;
    soon?: boolean;
  }> = ({ title, description, icon, soon }) => {
    let iconClass = "w-5 h-5 text-blue-900 group-hover:scale-110 transition-transform duration-300";
    return (
      <Badge.Ribbon className={`${soon ? "" : "hidden"}`} text="Soon" color="geekblue">
        <div className={`group cursor-pointer w-full h-full flex flex-col gap-1 py-2 px-4 rounded-xl bg-gradient-to-r from-white to-teal-50`}>
          <div className="flex flex-col lg:flex-row gap-1 items-center">
            {icon({ className: iconClass })}
            <Divider type="vertical" className="h-0 lg:h-4 !border-blue-900" />
            <h5 className="lg:text-start text-sm lg:text-md text-blue-900">{title}</h5>
          </div>
          <p className="lg:text-start text-xs lg:text-sm text-gray-800 mt-auto">{description}</p>
        </div>
      </Badge.Ribbon>
    );
  };
  const ClinicForm: React.FC = () => {
    return (
      <Form form={requestDemoFormStep0} layout="vertical" onFinish={handleCompleteStep0}>
        <div className="flex flex-col">
          <h5 className="text-xl text-gray-800">Klinik Bilgileri</h5>
          <Divider className="mt-2 mb-6" />
          <Form.Item name="clinic_name" label="Klinik Adı" rules={[{ required: true, message: "Lütfen kliniğinizin adını girin" }]}>
            <Input variant="filled" placeholder="Kliniğinizin adını girin" name="clinic_name" />
          </Form.Item>
          <div className="grid grid-cols-2 gap-2">
            <Form.Item name="city" label="Şehir" rules={[{ required: true, message: "Lütfen bir şehir seçin" }]}>
              <Select
                showSearch
                variant="filled"
                placeholder="Şehir"
                options={citiesJson.turkey.cities.map((city) => ({ label: city.label, value: city.value }))}
                filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                onChange={(value) => {
                  setSelectedCity(value);
                  requestDemoFormStep0.resetFields(["district"]);
                }}
              />
            </Form.Item>
            <Form.Item name="district" label="İlçe" rules={[{ required: true, message: "Lütfen bir ilçe seçin" }]}>
              <Select
                showSearch
                variant="filled"
                placeholder="İlçe"
                filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                options={
                  selectedCity
                    ? citiesJson.turkey.cities
                        .find((city) => city.value === selectedCity)
                        ?.districts.map((district) => ({
                          label: district.label,
                          value: district.value,
                        }))
                    : []
                }
              />
            </Form.Item>
          </div>
          <Form.Item name="address" label="Açık Adres" rules={[{ required: true, message: "Lütfen açık adresinizi girin" }]}>
            <Input.TextArea variant="filled" placeholder="Açık adresinizi yazın" name="address" rows={3} />
          </Form.Item>
          <Divider className="mt-2 mb-4" />
          <Form.Item
            name="services_offered"
            label="Bu hizmetlerden hangilerini sunuyorsunuz?"
            rules={[{ required: true, message: "Lütfen en az bir hizmet seçin" }]}
          >
            <Checkbox.Group
              className="grid grid-cols-2 gap-1"
              options={["Muayene", "Ameliyat", "Aşılama", "Laboratuvar", "Radyoloji", "Ürün Satışı", "Yatılı Tedavi", "Online Randevu"]}
            />
          </Form.Item>
        </div>
      </Form>
    );
  };
  const UserForm: React.FC = () => {
    return (
      <Form form={requestDemoFormStep1} layout="vertical" onFinish={handleCompleteStep1}>
        <div className="flex flex-col">
          <h5 className="text-xl text-gray-800">Kişisel Bilgiler</h5>
          <Divider className="mt-2 mb-6" />
          <div className="grid grid-cols-2 gap-2">
            <Form.Item name="first_name" label="Ad" rules={[{ required: true, message: "Lütfen adınızı girin" }]}>
              <Input variant="filled" placeholder="Adınız" name="first_name" />
            </Form.Item>
            <Form.Item name="last_name" label="Soyad" rules={[{ required: true, message: "Lütfen soyadınızı girin" }]}>
              <Input variant="filled" placeholder="Soyadınız" name="last_name" />
            </Form.Item>
          </div>
          <Form.Item name="email" label="Email Adresi" rules={[{ required: true, message: "Lütfen email adresinizi girin" }]}>
            <Input variant="filled" placeholder="Email adresiniz" name="email" />
          </Form.Item>
          <Form.Item name="phone" label="Telefon Numarası" rules={[{ required: true, message: "Lütfen telefon numaranızı girin" }]}>
            <Input variant="filled" placeholder="Telefon Numaranız" name="phone" addonBefore="+90" />
          </Form.Item>
        </div>
        <Divider className="mt-2 mb-4" />
        <div className="flex flex-col gap-2">
          <Form.Item
            name="feedback_channel"
            label="Size ulaşabileceğimiz iletişim araçları"
            rules={[{ required: true, message: "Lütfen en az bir iletişim aracı seçin" }]}
          >
            <Checkbox.Group className="grid grid-cols-2 gap-1" options={["Email", "SMS", "Telefon", "WhatsApp"]} />
          </Form.Item>
          <Form.Item name="active_softwares" label="Daha önce herhangi birini kullandınız mı?">
            <Checkbox.Group
              className="grid grid-cols-2 gap-1"
              options={["E-vet", "Kolayvet", "biVet", "BulutVet", "PratikVet", "Eveterinerim"]}
            />
          </Form.Item>
        </div>
      </Form>
    );
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-32 p-6 lg:p-16 bg-gradient-to-tr from-green-50 to-green-100">
      <div className="flex flex-col gap-6 text-center lg:text-start">
        <span className="flex flex-col gap-2 lg:gap-0">
          <h5 className="text-3xl xl:text-4xl heading-gradient font-bold">Ücretsiz 30 Gün Deneme: Taahhüt Yok</h5>
          <p className="text-xl xl:text-2xl text-green-500">Formu doldurun, hemen kullanmaya başlayın. Ücretsiz ve taahhütsüz.</p>
        </span>
        <div className="flex flex-col">
          <Divider orientation="left" className="!hidden lg:!flex !border-gray-600">
            <h2 className="text-lg text-gray-600 font-raleway">Size Neler Sunuyoruz?</h2>
          </Divider>
          <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-2">
            <FeatureCard
              title="Kolayca müşterilerinizi yönetin"
              description="Müşterilerinizi kaydedin ve düzenleyin, yaptığı işlemleri görüntüleyin"
              icon={ManageClientsIcon}
            />
            <FeatureCard
              title="Hasta kayıtlarınızı tutun"
              description="Hasta kayıtlarınızı oluşturun, düzenleyin ve takip edin"
              icon={ManagePatientsIcon}
            />
            <FeatureCard
              title="Çalışanlarınızı ve şubelerinizi yönetin"
              description="Çalışanlarınızı ve şubelerinizi ekleyin, tek bir yerden yönetin"
              icon={BranchesIcon}
            />
            <FeatureCard
              title="Cihazlarınızı kontrol edin"
              description="Kontrol sizde, cihazlarınızı uzaktan yönetin ve izleyin"
              icon={DevicesIcon}
            />
            <FeatureCard
              title="Yapay zeka destekli özellikler"
              description="İşlemlerinizi yapay zeka ile hızlandırın ve kolaylaştırın"
              icon={AiIcon}
            />
            <FeatureCard
              soon
              title="Gelişmiş randevu sistemi"
              description="Randevu oluşturun, yönetin ve müşterilerinize bildirin"
              icon={AppointmentsIcon}
            />
            <FeatureCard
              soon
              title="Stok takibi"
              description="Stoklarınızı takip edin, siparişlerinizi oluşturun ve yönetin"
              icon={StockIcon}
            />
            <FeatureCard
              soon
              title="Detaylı raporlar"
              description="Detaylı raporlar ile verimliliğinizi arttırın ve işlerinizi analiz edin"
              icon={ReportsIcon}
            />
          </div>
        </div>
      </div>
      <div className="relative m-auto flex flex-col gap-4 p-8 h-[750px] lg:h-[680px] w-full lg:w-[480px] bg-gradient-to-br from-green-50/75 to-white rounded-lg shadow-lg ">
        <Steps
          size="small"
          current={activeTab}
          onChange={onChange}
          items={[
            {
              title: "Klinik Bilgileri",
            },
            {
              title: "Kişisel Bilgiler",
            },
          ]}
        />
        {activeTab === 0 ? <ClinicForm /> : <UserForm />}
        {activeTab === 0 && (
          <CustomButton className="w-full mt-auto" onClick={handleCompleteStep0}>
            Devam Et
          </CustomButton>
        )}
        {activeTab === 1 && (
          <div className="mt-auto flex gap-4 bg-red-100">
            <CustomButton className="w-full" onClick={() => setActiveTab((prev) => prev - 1)}>
              Geri
            </CustomButton>
            <CustomButton className="w-full" type="submit" disabled={sendError} onClick={handleCompleteStep1}>
              Gönder
            </CustomButton>
          </div>
        )}
        {sendSuccess && (
          <div className="absolute z-50 user-events-none top-0 right-0 w-full h-full p-4 bg-gradient-to-b from-green-200/95 to-green-300/95 rounded-lg">
            <div className="w-full h-full flex flex-col items-center justify-center text-center gap-1">
              <h4 className="text-xl lg:text-2xl text-black font-bold mb-1">Başvurunu aldık</h4>
              <p className="text-sm lg:text-lg text-green-900">Hızlı bir şekilde ücretsiz üyeliğini oluşturacağız</p>
              <p className="text-sm lg:text-lg text-green-900">Lütfen email adresini kontrol etmeyi unutma</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDemoPage;
