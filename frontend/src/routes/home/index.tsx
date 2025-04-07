import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import Background from "./-components/background";
// import Card from "./-components/card";
// import Card1 from "./-components/card1";
// import Card2 from "./-components/card2";
import Header from "./-components/header";

export const Route = createFileRoute("/home/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<Header />
			<Background />
		</div>
	);
}
