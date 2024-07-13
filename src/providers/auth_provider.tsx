import { useEffect } from "react";
import { useAppSelector } from "@/hooks";
import { usePathname, useRouter } from "next/navigation";

const AuthProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();
  const router = useRouter();
  const { accessToken } = useAppSelector((state) => state.auth);

  const unauthenticatedPaths = ["/login", "/register"];

  useEffect(() => {
    if (!accessToken) {
      console.log("No access token");
      if (!unauthenticatedPaths.includes(pathname)) {
        router.push("/login");
      }
    } else {
      console.log("Access token exists");
      if (pathname !== "/admin") {
        router.push("/admin");
      }
    }
  }, [accessToken, pathname]);

  return children;
};

export default AuthProvider;
