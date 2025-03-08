import { SlIcon } from "@shoelace-style/shoelace/dist/react";
// import api from "@sendme/api";
import { Link, createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { MessagesList } from "./-components/MessagesList";

export const Route = createFileRoute("/messages/")({
	component: RouteComponent,
});

const CreateNewMessage = styled(Link)`
	height: 50px;
	width: 50px;
	background-color: #2E8B57;
	border-radius: 50%;
	align-self: flex-end;
	margin-top: 50px;
	font-size: 28px;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;

	@media screen and (max-width: 700px){
		margin-top: 80px;
		margin-right: 150px;
  }

`;

function RouteComponent() {
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
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
			<CreateNewMessage to="/conversation" className="createNewMessage">
				<SlIcon name="pencil-fill" />
			</CreateNewMessage>
			{/* <Link
				to="/conversation"
				className="CreateNewMessage">
			</Link> */}
		</div>
	);
}
