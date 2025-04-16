import styled from "styled-components";
import EditButton from "./edit_button";
import Header from "./header";
import Info from "./info";
import PastProj from "./past_proj";
import Tags from "./tags";

const BackGround = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: fit-content;
`;

const Background = () => (
	<BackGround>
		<Header />
		<EditButton />
		<Tags />
		<Info />
		<PastProj />
	</BackGround>
);

export default Background;
