// import api, { type components } from "@sendme/api";
import { SlAvatar, SlIcon, SlInput } from "@shoelace-style/shoelace/dist/react";
import type React from "react";
import styled from "styled-components";

const messages = [
	{
		id: 0,
		user: {
			profilePicture: "/images/christian-buehner-DItYlc26zVI-unsplash.jpg",
			userName: "John Smith",
			userID: 0,
		},
		timeStamp: "3:53 PM",
		messagePreview: "Hey! I heard about Servant's Day and would love to...",
		readMessage: true,
	},
	{
		id: 1,
		user: {
			profilePicture: "/images/microsoft-365-7mBictB_urk-unsplash.jpg",
			userName: "Clara Donovan",
			userID: 1,
		},
		timeStamp: "1:23 PM",
		messagePreview:
			"Hello! My name is Clara and I was wondering if there might...",
		readMessage: true,
	},
	{
		id: 2,
		user: {
			profilePicture: "/images/cosmic-timetraveler-_R1cc2IHk70-unsplash.jpg",
			userName: "Estes Church of Christ",
			userID: 2,
		},
		timeStamp: "2:40 AM",
		messagePreview:
			"We have an opening for a 5th grade teacher. We saw you had...",
		readMessage: false,
	},
	{
		id: 3,
		user: {
			profilePicture: "/images/karl-fredrickson-JRsZWmRd_Ws-unsplash.jpg",
			userName: "Henderson Church of Christ",
			userID: 3,
		},
		timeStamp: "9:00 AM",
		messagePreview:
			"We wanted to take a moment to thank you for your incredible...",
		readMessage: false,
	},
];

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

interface MessageProps {
	imagePath?: string;
	userName?: string;
	lastReadMessage?: string;
	lastReadTime: string;
	hasBeenRead: boolean;
}

const Message: React.FC<MessageProps> = ({
	imagePath,
	userName,
	lastReadMessage,
	lastReadTime,
	hasBeenRead,
}) => {
	const color = hasBeenRead ? "var(--sl-color-text)" : "#898989FF";
	const fontWeight = hasBeenRead ? "bold" : "thin";
	const readButtonVisibility = hasBeenRead ? "visible" : "hidden";
	const readButtonColor = hasBeenRead ? "#32B4FF" : "#fff";

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
						{lastReadTime}
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

export function MessagesList(): JSX.Element {
	return (
		<>
			{messages.map((message) => (
				<Message
					key={message.user.userID} // Ensure each element has a unique key
					imagePath={message.user.profilePicture}
					userName={message.user.userName}
					lastReadMessage={message.messagePreview}
					lastReadTime={message.timeStamp}
					hasBeenRead={message.readMessage}
				/>
			))}
		</>
	);
}
