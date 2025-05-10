import api from "@sendme/api";
import styled from "styled-components";

const DisplayName = styled.h2`
  color: var(--sl-color-text);
  text-align: center;
  width: 50%;
  margin: 0 0 10px 0;
  font-size: 1.8rem;
  font-weight: bold;
  justify-self: center;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

type MessageHeaderProps = {
	conversationId: string;
};

function MessageHeader({ conversationId }: MessageHeaderProps) {
	const { data: user } = api.auth.getMe.useQuery();

	const { data: conversation, refetch: refetchConversation } =
		api.conversations.getConversation.useQuery({
			path: { conversation_id: conversationId },
		});

	const otherUser = conversation?.users.find(
		(conversationUser) => user?.id !== conversationUser.id,
	);

	return (
		<DisplayName>
			{otherUser
				? `${otherUser.first_name} ${otherUser.last_name}`
				: "An error occurred"}
		</DisplayName>
	);
}

export default MessageHeader;
