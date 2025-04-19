import { createFileRoute } from "@tanstack/react-router";
import Background from "./-components/background";
import Header from "./-components/header";
import ProtectRoute from "../-preloaders/ProtectRoute";

export const Route = createFileRoute("/profile/")({
  component: RouteComponent,
  beforeLoad: ProtectRoute,
});

function RouteComponent() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Background />
    </div>
  );
}
