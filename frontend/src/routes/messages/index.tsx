import {
	SlIcon,
	SlIconButton,
	SlInput,
} from "@shoelace-style/shoelace/dist/react";
// import api from "@sendme/api";
import { Link, createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import { MessagesList } from "./-components/MessagesList";

export const Route = createFileRoute("/messages/")({
	component: RouteComponent,
});

const SearchMessages = styled(SlInput)`
	width: 100%;


	&::part(base) {
		box-shadow: none;
		border: 1px solid #2E8B57;
		border-radius: 20px;
	}
	
	@media (max-width: 768px) {
		margin-left: 10px;
		width: 80%;
  }
`;

const CreateNewMessage = styled(Link)`
	height: 50px;
	width: 50px;
	background-color: #2E8B57;
	border-radius: 50%;
	align-self: flex-end;
	margin-top: 10px;
	font-size: 28px;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;

	@media screen and (max-width: 700px){
		margin-top: 50px;
		margin-right: 150px;
  }

`;

function RouteComponent() {
	return (
		<>
			<h1 style={{ color: "#2E8B57", marginTop: "-40px", marginLeft: "20px" }}>
				Messages
			</h1>
			<SearchMessages placeholder="Search messages..." spellCheck>
				<SlIconButton
					name="search"
					slot="suffix"
					style={{ fontSize: "20px" }}
				/>
			</SearchMessages>
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
			</div>
		</>
	);
}
