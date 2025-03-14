import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";
import MessagesList from "./-components/MessagesList";
import api from "@sendme/api";
import { SlSpinner } from "@shoelace-style/shoelace/dist/react";
import { useQuery } from '@tanstack/react-query';


export const loader = async () => {
	try {
	  console.log('Fetching messages...');
	  const response = await fetch('/conversation.json');
	  console.log('Response status:', response.status);
	  if (!response.ok) {
		throw new Error('Failed to fetch messages');
	  }
	  const data = await response.json();
	  console.log('Messages loaded:', data);
	  return data;
	} catch (error) {
	  console.error('Error loading messages:', error);
	  throw new Error('Error loading messages');
	}
  };
  

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
  
  function RouteComponent() {
	const { data: messages, refetch } = useQuery({
		queryKey: ['conversation'],
		queryFn: async () => {
		  const response = await fetch('/conversation.json');
		  if (!response.ok) throw new Error('Failed to fetch messages');
		  return response.json();
		},
	  });

	
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
		  {!messages ? <SlSpinner /> : <MessagesList messages={messages.messages} />}
		</Link>
  
		<CreateNewMessage to="/conversation" className="createNewMessage">
		  <SlIcon name="pencil-fill" />
		</CreateNewMessage>
	  </div>
	);
  }