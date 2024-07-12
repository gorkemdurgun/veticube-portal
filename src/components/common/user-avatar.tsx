import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout } from "@/redux/slices/auth/authSlice";
import { Avatar, Button, Divider } from "antd";

export const UserAvatar: React.FC<{
  user: {
    imageUrl?: string;
    name: string;
    clinicName: string;
  };
}> = ({ user: { imageUrl, name, clinicName } }) => {
  const dispatch = useAppDispatch();

  const { darkMode } = useAppSelector((state) => state.theme);

  return (
    <div
      className={`flex flex-row items-center gap-2 py-1 px-4 rounded-lg shadow-xl border
        compatible-dark ${darkMode ? "bg-gray-600/20 text-white" : "bg-white text-black"} `}
    >
      <Avatar size={"small"} src={imageUrl} />
      <span>{name}</span>
      <Divider type="vertical" />
      <span className="font-semibold">{clinicName}</span>
      <Divider type="vertical" />
      <Button type="link" onClick={() => dispatch(logout())}>
        Logout
      </Button>
    </div>
  );
};
