import { PiSignOutDuotone as SignOutIcon } from "react-icons/pi";

import { Avatar, Button, Divider, Popconfirm } from "antd";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { apolloGqlClient } from "@/providers/app_apollo_gql_provider";
import { logout } from "@/redux/slices/auth/authSlice";
import { persistor } from "@/redux/store";

export const UserAvatar: React.FC<{}> = () => {
  const dispatch = useAppDispatch();
  // const { darkMode } = useAppSelector((state) => state.theme);
  let darkMode = false;
  const { user } = useAppSelector((state) => state.user);

  return (
    <div
      className={`cursor-pointer flex flex-row items-center gap-2 py-0 px-4 rounded-lg shadow-sm border
        compatible-dark ${darkMode ? "bg-gray-600/20 text-white" : "bg-white text-black"} `}
    >
      <Avatar size="small" shape="square" className="w-5 h-5 capitalize bg-gray-200 text-gray-500" icon={user?.full_name?.charAt(0)} />
      <span className="text-sm text-gray-500">{`${user?.full_name}`}</span>
      {/* <span className="text-xs text-gray-400">{`(${user?.role})`}</span> */}
      <Divider type="vertical" className="mx-0" />
      <Popconfirm
        icon={null}
        title="Are you sure you want to sign out?"
        okButtonProps={{ danger: true }}
        onConfirm={() => {
          apolloGqlClient.clearStore();
          persistor.purge();
        }}
      >
        <Button danger type="link" className="mx-0 p-0">
          <SignOutIcon className="w-4 h-4" />
        </Button>
      </Popconfirm>
    </div>
  );
};
