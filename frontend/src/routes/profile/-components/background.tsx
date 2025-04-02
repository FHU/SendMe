import styled from "styled-components";
import Header from "./header";
import Tags from "./tags";
import Info from "./info";
import PastProj from "./past_proj";

const BackGround = styled.div`
  display: flex;
  flex-direction: column;
`;

const Background = () => (
	<BackGround>
    <Header/>
    <Tags/>
    <Info/>
    <PastProj/>
	</BackGround>
);

export default Background;
