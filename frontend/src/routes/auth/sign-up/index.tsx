import { createFileRoute, redirect } from "@tanstack/react-router";
import SignUpForm from "./-components/SignUpForm";

export const Route = createFileRoute("/auth/sign-up/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <SignUpForm />;
}
