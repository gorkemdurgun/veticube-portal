import { useAppSelector } from "@/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

type AppAuthProviderProps = {
  children: React.ReactNode;
};

export const AppAuthProvider: React.FC<AppAuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const unprotectedRoutes = ["/", "/login", "/register", "/forgot-password"];

  useEffect(() => {
    if (!isAuthenticated && !unprotectedRoutes.includes(pathname)) {
      router.push("/login");
    } else if (isAuthenticated && unprotectedRoutes.includes(pathname)) {
      // router.push("/admin");
    }
  }, [isAuthenticated, pathname]);

  return <>{children}</>;
};

export default AppAuthProvider;
