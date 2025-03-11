// import api, { type components } from "@sendme/api";
import { SlAvatar } from "@shoelace-style/shoelace/dist/react";
import type React from "react";
import styled from "styled-components";
import { preview } from "vite";



const MessageCard = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
  grid-template-rows: 1fr 0.5fr 0.5;
  background-color: #fff;
  margin-bottom: 20px;

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
  margin-top: 40px;
  
  @media screen and (max-width: 700px){
    grid-row-start: 1;
    grid-row-end: 2;
    grid-column: 3;
    margin-top: 50px;
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
    font-size: 1.10rem;
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

export interface ConversationType {
	id: number;
	text: string;
	timestamp: string;
	//senderID: number;
	isUser: boolean;	
}

export interface MessageType {
	id: number;
	user: { profilePicture:string; userName:string; userID:number;}
    timestamp?: string;
    messagePreview: string;
    readMessage: boolean;
	conversation: ConversationType[];
}

export interface MessageProps {
    message: MessageType;
	}

export const Message: React.FC<MessageProps> = ( {message}) => {

	console.log(message.user)
	console.log(message.timestamp)

	const textColor = message.readMessage ? "#000000" : "#898989FF";
	const messageColor = message.readMessage ? "#000000" : "#898989FF";
	const timeColor = message.readMessage ? "#000000" : "#898989FF";
	const fontWeight = message.readMessage ? "bold" : "thin";

	return (
		<>
			<div style={{ display: "grid", gridTemplateColumns: "1fr .025fr" }}>
				<MessageCard style={{ gridColumn: "1" }}>
					<SlAvatar
						image={message.user.profilePicture}
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
						{message.user.userName}
					</UserName>
					<LastReadText
						style={{
							color: messageColor,
							fontWeight: fontWeight,
						}}
					>
						{message.messagePreview}
					</LastReadText>
					<LastReadTime
						style={{
							color: timeColor,
							fontWeight: fontWeight,
						}}
					>
						{message.timestamp}
					</LastReadTime>
					{message.readMessage && <ReadButton />}
				</MessageCard>
			</div>
		</>
	);
};