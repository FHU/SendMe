import { SlIcon } from "@shoelace-style/shoelace/dist/react";
// import api from "@sendme/api";
import { Link, createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import MessagesList from "./-components/MessagesList";

import messages from "./messages.json" 

export const Route = createFileRoute("/messages/")({
  component: RouteComponent,
});

const CreateNewMessage = styled(Link)`
  height: 50px;
  width: 50px;
  background-color: #2e8b57;
  border-radius: 50%;
  align-self: flex-end;
  margin-top: 50px;
  font-size: 28px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 700px) {
    margin-top: 80px;
    margin-right: 150px;
  }
`;

// const messages = [
// 	{
// 		id: 0,
// 		user: {
// 			profilePicture: "/images/christian-buehner-DItYlc26zVI-unsplash.jpg",
// 			userName: "John Smith",
// 			userID: 0,
// 		},
// 		timeStamp: "3:53 PM",
// 		messagePreview:
// 			"Hey! I heard about Servant's Day and would love to contribute...",
// 		readMessage: true,
// 	},
// 	{
// 		id: 1,
// 		user: {
// 			profilePicture: "/images/microsoft-365-7mBictB_urk-unsplash.jpg",
// 			userName: "Clara Donovan",
// 			userID: 1,
// 		},
// 		timeStamp: "1:23 PM",
// 		messagePreview:
// 			"Hello! My name is Clara and I was wondering if there might...",
// 		readMessage: true,
// 	},
// 	{
// 		id: 2,
// 		user: {
// 			profilePicture: "/images/cosmic-timetraveler-_R1cc2IHk70-unsplash.jpg",
// 			userName: "Estes Church of Christ",
// 			userID: 2,
// 		},
// 		timeStamp: "2:40 AM",
// 		messagePreview:
// 			"We have an opening for a 5th grade teacher. We saw you had...",
// 		readMessage: false,
// 	},
// 	{
// 		id: 3,
// 		user: {
// 			profilePicture: "/images/karl-fredrickson-JRsZWmRd_Ws-unsplash.jpg",
// 			userName: "Henderson Church of Christ",
// 			userID: 3,
// 		},
// 		timeStamp: "9:00 AM",
// 		messagePreview:
// 			"We wanted to take a moment to thank you for your incredible...",
// 		readMessage: false,
// 	},
// ];


function RouteComponent() {
	console.log(messages)
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{ color: "#2E8B57", marginTop: "-20px", marginLeft: "20px" }}>
        Messages
      </h1>

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
        <MessagesList messages={messages}/>

      </Link>
      <CreateNewMessage to="/conversation" className="createNewMessage">
        <SlIcon name="pencil-fill" />
      </CreateNewMessage>
      {/* <Link
				to="/conversation"
				className="CreateNewMessage">
			</Link> */}
    </div>
  );
}
