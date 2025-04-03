import api, { type components } from "@sendme/api";
import { SlAvatar } from "@shoelace-style/shoelace/dist/react";
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

const ReadButton = styled.div`
  height: 15px;
  width: 15px;
  border-radius: 50%;
  grid-column: 5;
  grid-row: 2;
  align-self: center;
  margin-left: -40%;
  
  @media screen and (max-width: 700px){
    grid-row: 1;
    grid-column: 3;
    margin-top: 40px;
    margin-left: 80px;

  }
`;

const MessageCard = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
  grid-template-rows: 1fr 0.5fr 0.5;
  background-color: var(--sl-color-primary);
  margin-bottom: 20px;
  width: 110%;

  &:hover{
	border-radius: 20px;
	background-color: var(--sl-hover-color);
  }

  @media screen and (max-width: 700px){
    grid-template-columns: 0.5fr 1fr 0.5fr;
    grid-template-rows: 1fr 0.5fr;
    margin-bottom: 0px;
	margin-left: 2px;
	width: 80%;
	align-items: center;
  }
`;

const UserName = styled.h2`
	grid-row: 1 / span 2;
	grid-column: 2 / span 2;

  @media screen and (max-width: 700px){
    grid-row: 1;
    font-size: 16px;
  }

`;
const LastReadText = styled.p`
	grid-row: 2;
	grid-column: 2 / span 3;
	padding-top: 40px;

  @media screen and (max-width: 700px){
    grid-row: 1 / span 2;
    grid-column: 2;
	font-size: 14px;
  }
`;
const LastReadTime = styled.p`
	grid-row: 1 / span 2;
	grid-column: 4;
	padding-top: 6px;

  @media screen and (max-width: 700px){
    grid-column: 3;
	align-self: start;
  }

`;

interface ConversationProps {
	imagePath?: string;
	userName?: string;
	lastReadMessage?: string;
	lastReadTime: string;
	hasBeenRead: boolean;
}

const Conversation: React.FC<ConversationProps> = ({
	imagePath,
	userName,
	lastReadMessage,
	lastReadTime,
	hasBeenRead,
}) => {
	const color = hasBeenRead ? "#898989FF" : "#000000";
	const fontWeight = hasBeenRead ? "thin" : "bold";
	const readButtonVisibility = hasBeenRead ? "hidden" : "visible";
	const readButtonColor = hasBeenRead ? "#fff" : "#32B4FF";

	const formattedDate = formatDate(lastReadTime);

	return (
		<>
			<div style={{ marginTop: "10px" }}>
				<MessageCard>
					<SlAvatar
						image={imagePath}
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
					<ReadButton
						style={{
							visibility: readButtonVisibility,
							backgroundColor: readButtonColor,
						}}
					/>
				</MessageCard>
			</div>
		</>
	);
};

export function ConversationList({
	data,
}: {
	data: components["schemas"]["Conversation"][];
}): JSX.Element {
	return (
		<>
			{data?.map((conversation) => (
				<Conversation
					key={conversation.id}
					imagePath={conversation.last_updated}
					userName={conversation.user}
					lastReadMessage={conversation.most_recent}
					lastReadTime={conversation.last_updated}
					hasBeenRead={conversation.is_read}
				></Conversation>
			))}
		</>
	);
}
