import { NhostClient, NhostProvider } from "@nhost/nextjs";

type AppNhostProviderProps = {
  children: React.ReactNode;
};

export const nhostClient = new NhostClient({
  subdomain: "nntumxfmlicwnzksyqnw",
  region: "eu-central-1",
});

const AppNhostProvider: React.FC<AppNhostProviderProps> = ({ children }) => {
  return <NhostProvider nhost={nhostClient}>{children}</NhostProvider>;
};

export default AppNhostProvider;
