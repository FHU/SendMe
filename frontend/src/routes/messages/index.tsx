// import api from "@sendme/api";
import { Link, createFileRoute } from "@tanstack/react-router";
// import styled from "styled-components";
import { MessagesList } from "./-components/MessagesList";

export const Route = createFileRoute("/messages/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<Link
				to="/conversation"
				className="messages"
				style={{
					display: "flex",
					flexDirection: "column",
					textDecoration: "none",
					color: "black",
				}}
			>
				<MessagesList />
			</Link>
		</>
	);
}
