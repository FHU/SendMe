import { SlIcon, SlIconButton } from "@shoelace-style/shoelace/dist/react";
import styled from "styled-components";
// import { CreateOpportunity } from "../-components/CreateOpportunity";

const HeaderContainer = styled.div`
  width: 400px;
  height: 250px;
  position: absolute;
  top: 0;
  margin-top: 4.5rem;
  z-index: -1;
  background-color: var(--sl-color-primary-100);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 1rem;
  filter: drop-shadow(0px 10px 4px #3232324b);
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  `;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: var(--sl-color-primary-800);
  margin-bottom: 0;
`;

const AddButton = styled(SlIconButton)`
  background: var(--sl-color-primary-500);
  border: none;
  border-radius: 50%;
  margin-top: 1rem;
  padding: 0.5rem;
  color: var(--sl-color-primary-950);
  font-size: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const Subtitle = styled.h2`
  font-size: 14px;
  font-weight: 300;
  color: var(--sl-color-primary-800);
  margin-top:0.25rem;
`;

const Header = () => (
	<HeaderContainer>
		<TitleRow>
			<Title>Opportunities</Title>
			{/* <SlIconButton name="plus-lg" style={{ fontSize: "1.5rem" }}>
        <SlIcon name="plus-lg"/>
      </SlIconButton> */}
			<AddButton name="plus-lg">
				<SlIcon name="plus-lg" />
			</AddButton>
		</TitleRow>
		<Subtitle>Tags Selected</Subtitle>
	</HeaderContainer>
);

export default Header;
