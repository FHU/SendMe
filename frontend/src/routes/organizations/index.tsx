import { createFileRoute } from "@tanstack/react-router";
import { CreateOrganizationForm } from "./-components/CreateOrganizationForm";

export const Route = createFileRoute("/organizations/")({
	component: RouteComponent,
});


function RouteComponent() {
  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto" }}>
      <CreateOrganizationForm />
    </div>
  );
}