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

	width: 110%;

	&::part(base) {
		box-shadow: none;
		border: 1px solid var(--sl-color-primary-500);
		border-radius: 20px;
		background-color: var(--sl-color-neutral-50);
	}
	
	@media (max-width: 700px) {
		margin-left: 10px;
		width: 78%;
  }
`;

const CreateNewMessage = styled(Link)`
	height: 50px;
	width: 50px;
	background-color: var(--sl-color-primary-500);
	border-radius: 50%;
	font-size: 24px;
	color: #fff;
	display: flex;
	justify-content: center;
	align-items: center;
	align-self: flex-end;
	margin-right: -13%;

	@media screen and (max-width: 700px){
		margin-top: 50px;
		margin-right: 130px;
  }

`;

const MessageHeader = styled.h1`
	
	color: var(--sl-color-primary-500);
	margin-top: -150px;

	@media screen and (max-width: 700px){
		margin-left: 20px;
  }
`;

function RouteComponent() {
	return (
		<div>
			<MessageHeader>Messages</MessageHeader>
			<SearchMessages placeholder="Search messages..." spellCheck>
				<SlIconButton
					name="search"
					slot="prefix"
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
		</div>
	);
}
