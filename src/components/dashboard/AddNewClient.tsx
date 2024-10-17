import React, { useState } from "react";

import { PiUserPlusDuotone as AddIcon } from "react-icons/pi";

import { Form, Input, Select, Divider } from "antd";

import { ComponentCard } from "../common";
import CustomButton from "../common/custom-button";
import EmailInput from "../common/email-input";
import UserSearchInput from "../common/user-search-input";

const { Option } = Select;

type ClientForm = {};

const AddNewClient = () => {
  const [loading, setLoading] = useState(false);
  const [clientForm] = Form.useForm();

  return <ComponentCard title="Müşteri Ekle" extra={<AddIcon className="text-2xl text-green-600" />}></ComponentCard>;
};

export default AddNewClient;
