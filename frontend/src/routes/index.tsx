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

			<Link to="/messages">
				<SlButton>Messages</SlButton>
			</Link>
			<Link to="/home">
				<SlButton>Home</SlButton>
			</Link>
		</div>
	);
}
