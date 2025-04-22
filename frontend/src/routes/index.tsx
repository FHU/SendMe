import api from "@sendme/api";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	const { data } = api.hello.helloWorldHelloGet.useQuery();
	return (
		<div>
			<h3>Server message: {data?.message}</h3>

			<Link to="/opportunities">
				<SlButton>Test</SlButton>
			</Link>

			<Link to="/conversations">
				<SlButton>Conversations</SlButton>
			</Link>
			<Link to="/home">
				<SlButton>Home</SlButton>
			</Link>
			<Link to="/profile">
				<SlButton>Profile</SlButton>
			</Link>
			<Link to="/auth">
				<SlButton>Login</SlButton>
			</Link>
			<Link to="/auth/sign-up">
				<SlButton>Sign Up</SlButton>
			</Link>
		</div>
	);
}
