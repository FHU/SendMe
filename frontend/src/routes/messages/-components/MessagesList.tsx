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
		messagePreview:
			"Hey! I heard about Servant's Day and would love to contribute...",
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

const MessageCard = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
  grid-template-rows: 1fr 0.5fr 0.5;
  background-color: #fff;
  margin-bottom: 20px;

  &:hover{
	background-color: #D9D9D9;
	border-radius: 20px;
  }

  @media screen and (max-width: 700px){
    grid-template-columns: 0.5fr 1fr 1fr;
    grid-template-rows: 1fr 0.5fr;
    margin-bottom: 0px;
  }
`;

const ReadButton = styled.div`
  height: 15px;
  width: 15px;
  background-color: #32b4ff;
  border-radius: 50%;
  grid-column: 5;
  grid-row: 2;
  align-self: center;
  
  @media screen and (max-width: 700px){
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column: 3;
    margin-top: 30px;
    margin-left: 90px;

  }
`;

const UserName = styled.h2`
	grid-row-start: 1;
	grid-row-end: 3;
	grid-column-start: 2;
	grid-column-end: 4;	

  @media screen and (max-width: 700px){
    grid-row-start: 1;
    grid-row-end: 2;
    font-size: 16px;
  }

`;
const LastReadText = styled.p`
	grid-row-start: 2;
	grid-row-end: 3;
	grid-column-start: 2;
	grid-column-end: 5;
	padding-top: 40px;

  @media screen and (max-width: 700px){
    grid-row-start: 1;
    grid-row-end: 3;
    grid-column-end: 3;
    padding-top: 28px;
	font-size: 14px;
  }
`;
const LastReadTime = styled.p`
	grid-row-start: 1;
	grid-row-end: 3;
	grid-column-start: 4;
	padding-top: 6px;

  @media screen and (max-width: 700px){
    grid-column-start: 3;
  }

`;

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

interface MessageProps {
	imagePath?: string;
	userName?: string;
	lastReadMessage?: string;
	lastReadTime: string;
	showReadButton: boolean;
}

const Message: React.FC<MessageProps> = ({
	imagePath,
	userName,
	lastReadMessage,
	lastReadTime,
	showReadButton,
}) => {
	const textColor = showReadButton ? "#000000" : "#898989FF";
	const messageColor = showReadButton ? "#000000" : "#898989FF";
	const timeColor = showReadButton ? "#000000" : "#898989FF";
	const fontWeight = showReadButton ? "bold" : "thin";

	return (
		<>
			<div style={{ display: "grid", gridTemplateColumns: "1fr .025fr" }}>
				<MessageCard style={{ gridColumn: "1" }}>
					<SlAvatar
						image={imagePath}
						style={{
							gridRowStart: "1",
							gridRowEnd: "3",
							placeSelf: "center",
							transform: "scale(1.5)",
							marginTop: "10px",
						}}
					/>
					<UserName
						style={{
							color: textColor,
							fontWeight: fontWeight,
						}}
					>
						{userName}
					</UserName>
					<LastReadText
						style={{
							color: messageColor,
							fontWeight: fontWeight,
						}}
					>
						{lastReadMessage}
					</LastReadText>
					<LastReadTime
						style={{
							color: timeColor,
							fontWeight: fontWeight,
						}}
					>
						{lastReadTime}
					</LastReadTime>
					{showReadButton && <ReadButton />}
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
					showReadButton={message.readMessage}
				/>
			))}
		</>
	);
}
