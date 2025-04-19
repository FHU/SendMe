import api, { type components } from "@sendme/api";
import { SlAvatar } from "@shoelace-style/shoelace/dist/react";
import { Link } from "@tanstack/react-router";
import type React from "react";
import styled from "styled-components";

const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	return new Intl.DateTimeFormat("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	}).format(date);
};

const MessageCard = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
  grid-template-rows: 1fr 0.5fr 0.5;
  background-color: var(--sl-color-primary);
  width: 600px;
  margin-top: 20px;

  &:hover {
    border-radius: 20px;
    background-color: var(--sl-hover-color);
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: 0.5fr 1fr 0.5fr;
    grid-template-rows: 1fr 0.5fr;
    margin-bottom: 0px;
    margin-left: 2px;
    width: 100%;
    align-items: center;
  }
`;

const UserName = styled.h2`
  grid-row: 1 / span 2;
  grid-column: 2 / span 2;

  @media screen and (max-width: 700px) {
    grid-row: 1;
    font-size: 16px;
  }
`;
const LastReadText = styled.p`
  grid-row: 2;
  grid-column: 2 / span 3;
  padding-top: 40px;

  @media screen and (max-width: 700px) {
    grid-row: 1 / span 2;
    grid-column: 2;
    font-size: 14px;
  }
`;
const LastReadTime = styled.p`
  grid-row: 1 / span 2;
  grid-column: 4;
  padding-top: 6px;

  @media screen and (max-width: 700px) {
    grid-column: 3;
    align-self: start;
  }
`;

const ConversationLink = styled.div`
    display: none;


    @media screen and (max-width: 700px) {
        display: block;
  }
`
const ConversationDiv = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 1fr;
    column-gap: 50px;


    @media screen and (max-width: 700px) {
        display: none;
  }
`


interface ConversationProps {
	imagePath?: string | null;
	userName?: string;
	lastReadMessage?: string;
	lastReadTime: string;
	hasBeenRead: boolean;
	conversationId: string;
}

const Conversation: React.FC<ConversationProps> = ({
	imagePath,
	userName,
	lastReadMessage,
	lastReadTime,
	hasBeenRead,
	conversationId,
}) => {
	const color = hasBeenRead ? "#898989FF" : "var(--sl-color-text)";
	const fontWeight = hasBeenRead ? "thin" : "bold";
	const readButtonVisibility = hasBeenRead ? "hidden" : "visible";
	const readButtonColor = hasBeenRead ? "#fff" : "#32B4FF";

	const formattedDate = formatDate(lastReadTime);

	return (
		<>
		<ConversationLink>
			<Link
					to={"/messages/$conversationId"}
					params={{ conversationId }}
					style={{ marginTop: "10px", textDecoration: "none" }}
				>
						<ConversationBubble
							imagePath={imagePath}
							color={color}
							userName={userName}
							lastReadMessage={lastReadMessage}
							fontWeight={fontWeight}
							visibility={readButtonVisibility}
							readButtonColor={readButtonColor}
							formattedDate={formatDate(lastReadTime)}
						/>
				</Link>
		</ConversationLink>

		<ConversationDiv>
		<ConversationBubble
                        imagePath={imagePath}
                        color={color}
                        userName={userName}
                        lastReadMessage={lastReadMessage}
                        fontWeight={fontWeight}
                        visibility={readButtonVisibility}
                        readButtonColor={readButtonColor}
                        formattedDate={formatDate(lastReadTime)}
                    />

		</ConversationDiv>
		</>
	);
};

interface ConversationBubbleProps {
    imagePath?: string | null;
    color: string;
    fontWeight: string;
    userName?: string;
    lastReadMessage?: string;
    formattedDate: string;
    visibility: 'hidden' | 'visible';
    readButtonColor: string;
}


const ConversationBubble = ({
    imagePath,
    color,
    fontWeight,
    userName,
    lastReadMessage,
    formattedDate,
    visibility = 'visible',
    readButtonColor,
}: ConversationBubbleProps ) => {
    return (
        <>
        <MessageCard>
            <SlAvatar
                image={imagePath ?? ""}
                style={{
                    gridRowStart: "1",
                    gridRowEnd: "3",
                    placeSelf: "center",
                    transform: "scale(1.5)",
                }}
            />
            <UserName
                style={{
                    color: color,
                    fontWeight: fontWeight,
                }}
            >
                {userName}
            </UserName>
            <LastReadText
                style={{
                    color: color,
                    fontWeight: fontWeight,
                }}
            >
                {lastReadMessage}
            </LastReadText>
            <LastReadTime
                style={{
                    color: color,
                    fontWeight: fontWeight,
                }}
            >
                {formattedDate}
            </LastReadTime>

        </MessageCard>
        </>
    );
};


export function ConversationList({
	data,
	onSelect,
}: {
	data: components["schemas"]["Conversation"][];
	onSelect?: (id: string) => void;
}) {
	const { data: user } = api.auth.getMe.useQuery();

	return (
		<>
			{data?.map((conversation) => {
				const otherUser = conversation.users.find((u) => u.id !== user?.id);
				const handleClick = () => {
					if (onSelect) onSelect(conversation.id);
				};
				return (
					<div key={conversation.id} onClick={handleClick}>
						<Conversation
							conversationId={conversation.id}
							imagePath={otherUser?.profile_picture}
							userName={otherUser?.first_name}
							lastReadMessage={
								conversation.messages?.[conversation.messages.length - 1]?.content ?? ""
							}
							lastReadTime={conversation.last_updated}
							hasBeenRead={conversation.has_been_read ?? false}
						/>
					</div>
				);
			})}
		</>
	);
}
