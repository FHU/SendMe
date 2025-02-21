import api from "@sendme/api";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";

export const Route = createFileRoute("/messages/")({
	component: RouteComponent,
});

const AreaHeading = styled.h2``;

function RouteComponent() {
	return (
		<div>
			<h3>Messages</h3>

			<Link to="/conversation">
				<SlButton>Conversations</SlButton>
			</Link>
		</div>
	);
}
