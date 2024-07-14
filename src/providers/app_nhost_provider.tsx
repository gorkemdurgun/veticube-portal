import { nhostClient } from "@/utils/api";
import { NhostProvider } from "@nhost/nextjs";

type AppNhostProviderProps = {
  children: React.ReactNode;
};

const AppNhostProvider: React.FC<AppNhostProviderProps> = ({ children }) => {
  return <NhostProvider nhost={nhostClient}>{children}</NhostProvider>;
};

export default AppNhostProvider;
