import styled from "styled-components";
// import api, { type components } from "@sendme/api";
import { SlAvatar } from "@shoelace-style/shoelace/dist/react";
import React from "react";

const messages = [
	{imagePath: '../../../public/images/christian-buehner-DItYlc26zVI-unsplash.jpg', userName: 'John Smith', lastReadMessage: "Hey! I heard about Servant's Day and would love to contribute...", lastReadTime: '3:53 P.M.', isRead: false},
	{imagePath: '../../../public/images/microsoft-365-7mBictB_urk-unsplash.jpg', userName: 'Clara Donovan', lastReadMessage: "Hello! My name is Clara and I was wondering if there might...", lastReadTime: '1:23 P.M.', isRead: false},
	{imagePath: '../../public/images/karl-fredrickson-JRsZWmRd_Ws-unsplash.jpg', userName: 'Estes Church of Christ', lastReadMessage: "Hi! I’m interested in helping with the food drive and I thought that...", lastReadTime: '7:23 A.M.', isRead: true},
	{imagePath: '../../public/images/cosmic-timetraveler-_R1cc2IHk70-unsplash.jpg', userName: 'Henderson Church of Christ', lastReadMessage: "That sounds doable! Do I need to make an appointment with an elder or can I...", lastReadTime: '2:42 P.M.', isRead: true}
]

const MessageCard = styled.div`
	display: grid;
	grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
	grid-template-rows: 1fr 0.5fr 0.5;
	background-color: #fff;
`;

const ReadButton = styled.div`
	height: 15px;
	width: 15px;
	background-color: #32B4FF;
	border-radius: 50%;

`
const unReadButton = styled.div`
	height: 15px;
	width: 15px;
	background-color: #fff;
	border-radius: 50%;

`

interface MessageProps {
	imagePath?: string;
	userName?: string;
	lastReadMessage?: string;
	lastReadTime: string;
	isRead: boolean;
}

const Message: React.FC<MessageProps> = ({
	imagePath, 
	userName,
	lastReadMessage,
	lastReadTime,
	isRead
}) => {
	return(
		<div style={{display: 'grid', gridTemplateColumns: "1fr .025fr"}}>
			<MessageCard style={{gridColumn:"1"}}>
					<SlAvatar
					image={imagePath}
					style={{gridRowStart: '1', gridRowEnd: "3", placeSelf: "center", paddingTop: '10px'}}
					></SlAvatar>
				{isRead ? <>
				<h2 style={{gridRowStart: "1", gridRowEnd: '3', gridColumnStart: "2", gridColumnEnd: '4', color:"gray"}}>{userName}</h2>
				<p style={{gridRowStart: "2", gridRowEnd: '3', gridColumnStart:"2", gridColumnEnd: "5", paddingTop: '40px', color:"gray"}}>{lastReadMessage}</p>
				<p style={{gridRowStart: "1", gridRowEnd: '3', gridColumnStart:"4", color:"gray", paddingTop: '6px'}}>{lastReadTime}</p>
				</> : 
				<>
				<h2 style={{gridRowStart: "1", gridRowEnd: '3', gridColumnStart: "2", gridColumnEnd: '4'}}>{userName}</h2>
				<p style={{gridRowStart: "2", gridRowEnd: '3', gridColumnStart:"2", gridColumnEnd: "5", paddingTop: '40px'}}>{lastReadMessage}</p>
				<p style={{gridRowStart: "1", gridRowEnd: '3', gridColumnStart:"4", paddingTop: '6px'}}>{lastReadTime}</p>		
				</>}

				{isRead ? <ReadButton style={{gridColumn: '5', gridRow:'2', backgroundColor: 'white'}}/> : <ReadButton style={{gridColumn: '5', gridRow:'2', alignSelf: 'center', marginTop: '15px'}}/>}
			</MessageCard>

	</div>
	)

}


export function MessagesList({}): JSX.Element {
	return (
		<>
		{messages.map((message) => (
		  <Message
			imagePath={message.imagePath}
			userName={message.userName}
			lastReadMessage={message.lastReadMessage}
			lastReadTime={message.lastReadTime}
			isRead={message.isRead}
		  />
		))}
	  </>

		  )
		};