import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import Background from "./-components/background";

export const Route = createFileRoute("/home/")({
	component: RouteComponent,
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
