import api from "@sendme/api";
import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import Header from "../-components/header";
import ProtectRoute from "../-preloaders/ProtectRoute";
import { CreateOpportunity } from "../create-opportunities/-components/CreateOpportunity";
import Background from "./-components/background";

export const Route = createFileRoute("/home/")({
	component: RouteComponent,
	beforeLoad: ProtectRoute,
});

function RouteComponent() {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				paddingTop: "100px",
			}}
		>
			<Header showAddBtn={true} />
			<Background />
		</div>
	);
}
