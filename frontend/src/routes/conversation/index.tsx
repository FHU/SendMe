import React, { useEffect } from 'react';
import api from "@sendme/api";
import { SlButton, SlTextarea } from "@shoelace-style/shoelace/dist/react";
import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";

export const Route = createFileRoute("/conversation/")({
  component: Conversation,
});

const AreaHeading = styled.h2`
  font-size: 24px;
`;


function Conversation() {
  useEffect(() => {
  }, []);

  return (

    <div>
      <h3>Conversations</h3>
	  <AreaHeading>Start a new conversation</AreaHeading> {/* Called here */}
      <SlTextarea placeholder="Type something" filled />
      <SlButton onClick={() => console.log("Button clicked!")}>Send</SlButton>
    </div>
  );
}
