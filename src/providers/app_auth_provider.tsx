import { useEffect } from "react";
import { useAppSelector } from "@/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useAccessToken } from "@nhost/nextjs";

const AppAuthProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();
  const router = useRouter();
  const accessToken = useAccessToken();

  const unauthenticatedPaths = ["/login", "/register"];

  useEffect(() => {
    if (!accessToken) {
      if (!unauthenticatedPaths.includes(pathname)) {
        router.push("/login");
      }
    } else {
      if (pathname !== "/admin") {
        router.push("/admin");
      }
    }
  }, [accessToken, pathname]);

  return children;
};

export default AppAuthProvider;
