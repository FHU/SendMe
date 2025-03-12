import { SlAvatar } from "@shoelace-style/shoelace/dist/react";
import styled from "styled-components";

const MessageCard = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
  grid-template-rows: 1fr 0.5fr 0.5;
  background-color: #fff;
  margin-bottom: 20px;

  @media screen and (max-width: 700px) {
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

  @media screen and (max-width: 700px) {
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

  @media screen and (max-width: 700px) {
    grid-row-start: 1;
    grid-row-end: 2;
    font-size: 1.1rem;
  }
`;

const LastReadText = styled.p`
  grid-row-start: 2;
  grid-row-end: 3;
  grid-column-start: 2;
  grid-column-end: 5;
  padding-top: 40px;

  @media screen and (max-width: 700px) {
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

  @media screen and (max-width: 700px) {
    grid-column-start: 3;
  }
`;

export interface MessageProps {
  imagePath: string;
  userName: string;
  lastReadMessage: string;
  lastReadTime: string;
  showReadButton: boolean;
}

export const Message: React.FC<MessageProps> = ({
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
    <div style={{ display: "grid", gridTemplateColumns: "1fr .025fr" }}>
      <MessageCard>
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
  );
};
