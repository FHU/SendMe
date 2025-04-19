import api from "@sendme/api";
import { redirect } from "@tanstack/react-router";

interface ProtectRouteProps {
  location: Location;
}

const ProtectRoute = async ({ location }: ProtectRouteProps) => {
  const { data: user, isError } = api.auth.getMe.useQuery();

  if (!user || isError) {
    throw redirect({
      to: "/auth",
      search: {
        redirect: location.href,
      },
    });
  }
};

export default ProtectRoute;
