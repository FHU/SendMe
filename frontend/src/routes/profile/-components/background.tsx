import styled from "styled-components";
import Header from "./header";
import Info from "./info";
import PastProj from "./past_proj";
import Tags from "./tags";

const BackGround = styled.div`
  display: flex;
  flex-direction: column;
`;

const Background = () => (
	<BackGround>
		<Header />
		<Tags />
		<Info />
		<PastProj />
	</BackGround>
);

export default Background;
