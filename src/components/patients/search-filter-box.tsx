import { Radio, Space, Divider } from "antd";

type Props = {};

export const SearchFilterBox = ({}: Props) => {
  return (
    <div className="grid grid-cols-1 gap-2 py-2 px-4 rounded-lg bg-gray-100">
      <Radio.Group>
        <h5 className="text-sm text-gray-500 mb-2">Species</h5>
        <Space className="grid grid-cols-1 lg:grid-cols-2 gap-2" direction="vertical">
          <Radio value="cats">Cats</Radio>
          <Radio value="dogs">Dogs</Radio>
        </Space>
      </Radio.Group>
      <Divider className="my-2" />
      <Radio.Group>
        <h5 className="text-sm text-gray-500 mb-2">Gender</h5>
        <Space className="grid grid-cols-1 lg:grid-cols-2 gap-2" direction="vertical">
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </Space>
      </Radio.Group>
      <Divider className="my-2" />
      <Radio.Group>
        <h5 className="text-sm text-gray-500 mb-2">Age</h5>
        <Space className="grid grid-cols-1 lg:grid-cols-2 gap-2" direction="vertical">
          <Radio value="0-1">0-1 years</Radio>
          <Radio value="1-5">1-5 years</Radio>
          <Radio value="5-10">5-10 years</Radio>
          <Radio value="10+">10+ years</Radio>
        </Space>
      </Radio.Group>
    </div>
  );
};
