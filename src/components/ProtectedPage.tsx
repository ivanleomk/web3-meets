import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { type ReactNode } from "react";

type ProtectedPageProps = {
  children: ReactNode;
};

const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const user = useUser();
  const router = useRouter();
  if (!user) {
    router.push("/");
    return null;
  }
  return <>{children}</>;
};

export default ProtectedPage;
