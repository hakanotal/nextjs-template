import { useEffect } from "react";
import { useRouter } from "next/router";
import { LoadingOverlay } from "@mantine/core";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);

  return <LoadingOverlay visible={true} overlayBlur={2} />;
};
export default RedirectPage;
