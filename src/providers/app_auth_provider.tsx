import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthenticated } from "@nhost/nextjs";

const AppAuthProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthenticated = useAuthenticated();

  const authRequiredPaths = ["/admin"];
  const authNotRequiredPaths = ["/", "/login", "/register"];

  useEffect(() => {
    if (isAuthenticated && authNotRequiredPaths.includes(pathname)) {
      router.push("/admin");
    } else if (!isAuthenticated && authRequiredPaths.includes(pathname)) {
      router.push("/login");
    }
  }, [pathname, isAuthenticated]);

  return <>{children}</>;
};

export default AppAuthProvider;
