import api from "@sendme/api";
import { SlButton } from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";

export const Route = createFileRoute("/conversation/")({
	component: RouteComponent,
});

const AreaHeading = styled.h2``;

function RouteComponent() {
	return (
		<div>
			<h3>Conversations</h3>
		</div>
	);
}
