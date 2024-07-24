import { useAppSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AppAuthProviderProps = {
  children: React.ReactNode;
};

export const AppAuthProvider: React.FC<AppAuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return <>{children}</>;
};

export default AppAuthProvider;
