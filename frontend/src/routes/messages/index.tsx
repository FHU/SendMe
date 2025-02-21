import api from "@sendme/api";
import { SlSpinner } from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";

export const Route = createFileRoute("/messages/")({
	component: RouteComponent,
});

const AreaHeading = styled.h2``;

function RouteComponent() {
	return (
		<>
      <h3>Messages</h3>
		</>
	);
}
