import styled from "styled-components";
// import api, { type components } from "@sendme/api";
import { SlAvatar } from "@shoelace-style/shoelace/dist/react";
import React from "react";


const images = ['../../../public/images/christian-buehner-DItYlc26zVI-unsplash.jpg', '../../../public/images/microsoft-365-7mBictB_urk-unsplash.jpg']
const userNames = ['John Smith', 'Clara Donovan']
const lastReadMessage = ["Hey! I heard about Servant's Day and would love to contribute...", "Hello! My name is Clara and I was wondering if there might..."]
const lastReadTime = ['3:53 P.M.', '1:23 P.M.']

const MessageCard = styled.div`
	display: grid;
	grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
	grid-template-rows: 1fr 1fr;
	background-color: hsl(240 5.9% 90%);
	margin-bottom: 20px;
`;

const ReadButton = styled.div`
	height: 15px;
	width: 15px;
	background-color: #32B4FF;
	border-radius: 50%;

`

interface MessageProps {
	imagePath?: string;
	userName?: string;
	lastReadMessage?: string;
	lastReadTime: string;
}

const Message: React.FC<MessageProps> = ({
	imagePath, 
	userName,
	lastReadMessage,
	lastReadTime
}) => {
	return(
		<div style={{display: 'grid', gridTemplateColumns: "1fr .025fr"}}>
			<MessageCard style={{gridColumn:"1"}}>
					<SlAvatar
					image={imagePath}
					style={{gridRowStart: '1', gridRowEnd: "3", placeSelf: "center"}}
					></SlAvatar>
				<h3 style={{gridRowStart: "1", gridColumnStart: "2"}}>{userName}</h3>
				<p style={{gridRowStart: "2", gridColumnStart:"2", gridColumnEnd: "5"}}>{lastReadMessage}</p>
				<p style={{gridRowStart: "1", gridColumnStart:"4"}}>{lastReadTime}</p>

			</MessageCard>
			<ReadButton style={{gridColumn: '2', placeSelf: "center"}}></ReadButton>
	</div>
	)

}

export function MessagesList({
}): JSX.Element {
	return (
		<>
			<Message
			imagePath={images[0]}
			userName={userNames[0]}
			lastReadMessage={lastReadMessage[0]}
			lastReadTime={lastReadTime[0]}>
			</Message>
			<Message
			imagePath={images[1]}
			userName={userNames[1]}
			lastReadMessage={lastReadMessage[1]}
			lastReadTime={lastReadTime[1]}>
			</Message>
		</>

		  )
		};