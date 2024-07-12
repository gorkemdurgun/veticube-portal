import { useEffect } from "react";
import { useAppSelector } from "@/hooks";
import { useRouter } from "next/navigation";

const AuthProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const router = useRouter();
  const { accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken) {
      console.log("No access token");
      router.push("/login");
    } else {
      console.log("Access token exists");
      router.push("/admin");
    }
  }, [accessToken, router]);

  return children;
};

export default AuthProvider;
