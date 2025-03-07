import styled from "styled-components";
import Card from "./card";
import Card1 from "./card1";
import Card2 from "./card2";

const BackGround = styled.div`
  background: #2E8B57;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  max-width: fit-content;
`;

const Background = () => (
	<BackGround>
		<Card />
		<Card1 />
		<Card2 />
	</BackGround>
);

export default Background;
