import { createFileRoute } from "@tanstack/react-router";
import AuthForm from "./-components/Auth";

export const Route = createFileRoute("/auth/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <AuthForm />;
}
