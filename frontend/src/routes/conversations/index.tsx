import api from "@sendme/api";
import {
	SlIcon,
	SlIconButton,
	SlInput,
	SlSpinner,
} from "@shoelace-style/shoelace/dist/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import styled from "styled-components";
import { ConversationList } from "./-components/ConversationList";

export const Route = createFileRoute("/conversations/")({
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

const CreateNewConversation = styled(Link)`
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

  @media screen and (max-width: 700px) {
    margin-top: 50px;
    margin-right: 130px;
  }
`;

const MessageHeader = styled.h1`
  color: var(--sl-color-primary-500);
  margin-top: -150px;

  @media screen and (max-width: 700px) {
    margin-left: 20px;
  }
`;

function RouteComponent() {
	const { data, refetch } = api.conversations.getAllConversations.useQuery();

	//This useEffect is to seed the database to test conversations. Remove in the future.

	useEffect(() => {
		fetch("/api/conversations/seed", { method: "POST" });
	}, []);

	return (
		<div>
			<MessageHeader>Messages</MessageHeader>
			<SearchMessages placeholder="Search messages..." spellCheck={false}>
				<SlIconButton
					name="search"
					slot="prefix"
					style={{ fontSize: "20px" }}
				/>
			</SearchMessages>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<Link
					to="/messages"
					className="messages"
					style={{
						display: "flex",
						flexDirection: "column",
						textDecoration: "none",
						color: "black",
					}}
				>
					{!data ? <SlSpinner /> : <ConversationList data={data} />}
				</Link>
				<CreateNewConversation to="/messages" className="createNewMessage">
					<SlIcon name="pencil-fill" />
				</CreateNewConversation>
			</div>
		</div>
	);
}
