import { useEffect } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useAppSelector } from "@/hooks";

type AppAuthProviderProps = {
  children: React.ReactNode;
};

export const AppAuthProvider: React.FC<AppAuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const publicRoutes = ["/", "/login", "/sign-up"];

  useEffect(() => {
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      // router.push("/login");
    } else {
      return;
    }
  }, [isAuthenticated, pathname]);

  return <>{children}</>;
};

export default AppAuthProvider;
