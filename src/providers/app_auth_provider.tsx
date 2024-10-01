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
  console.log("isAuthenticated", isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      return;
    }
  }, [isAuthenticated, pathname]);

  return <>{children}</>;
};

export default AppAuthProvider;
