import { Card, Segmented, Divider, Form, Input, FormProps, Button } from "antd";
import { useState } from "react";

type TabOptions = "new" | "verify";
type NewUserFormType = {
  first_name?: string;
  last_name?: string;
  email?: string;
};

export const RegisterUserCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabOptions>("new");

  const NewUserForm = () => {
    const onFinish: FormProps<NewUserFormType>["onFinish"] = (values) => {
      console.log("Success:", values);
    };

    return (
      <Form layout="vertical" onFinish={onFinish}>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item<NewUserFormType> name="first_name" label="First Name">
            <Input />
          </Form.Item>
          <Form.Item<NewUserFormType> name="last_name" label="Last Name">
            <Input />
          </Form.Item>
        </div>
        <Form.Item<NewUserFormType> name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button className="w-full" type="primary" htmlType="submit">
            Register User
          </Button>
        </Form.Item>
      </Form>
    );
  };

  const VerifyUserForm = () => {
    return (
      <Card>
        <h1>Verify User Form</h1>
      </Card>
    );
  };

  return (
    <Card className="flex flex-col">
      <Segmented
        className="w-full"
        value={activeTab}
        options={[
          { value: "new", label: "New User", className: "w-full" },
          { value: "verify", label: "Verify User", className: "w-full" },
        ]}
        onChange={(value) => {
          setActiveTab(value as TabOptions);
        }}
      />
      <Divider />
      {activeTab === "new" && <NewUserForm />}
      {activeTab === "verify" && <VerifyUserForm />}
    </Card>
  );
};
