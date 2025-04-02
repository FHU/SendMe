import styled from "styled-components";
import Header from "./header";
import Tags from "./tags";
import Info from "./info";
import PastProj from "./past_proj";

const BackGround = styled.div
` background: var(--sl-color-primary-50);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center
  max-width: fit-content`
;

const Background = () => (
	<BackGround>
    <Header/>
    <Tags/>
    <Info/>
    <PastProj/>
	</BackGround>
);

export default Background;
