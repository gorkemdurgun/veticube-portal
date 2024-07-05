import { useAppSelector } from "@/hooks";
import { Avatar, Button, Divider } from "antd";

export const UserAvatar: React.FC<{
  user: {
    imageUrl?: string;
    name: string;
    clinicName: string;
  };
}> = ({ user: { imageUrl, name, clinicName } }) => {
  const { darkMode } = useAppSelector((state) => ({
    darkMode: state.theme.darkMode,
  }));

  return (
    <div
      className={`flex flex-row items-center gap-2 py-1 px-4 rounded-lg shadow-xl border
        compatible-dark ${darkMode ? "bg-gray-700 text-white" : "bg-white text-black"} `}
    >
      <Avatar size={"small"} src={imageUrl} />
      <span>{name}</span>
      <Divider type="vertical" />
      <span className="font-oswald font-semibold">{clinicName}</span>
    </div>
  );
};
