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

  // const unprotectedRoutes = ["/", "/login", "/register", "/forgot-password"];

  useEffect(() => {
    if (!isAuthenticated) {
      // router.push("/login");
    } else if (isAuthenticated) {
      // router.push("/admin");
    } else {
      return;
    }
  }, [isAuthenticated, pathname]);

  return <>{children}</>;
};

export default AppAuthProvider;
