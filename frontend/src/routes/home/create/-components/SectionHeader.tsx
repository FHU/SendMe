import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 35.5rem;
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

const Title = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: var(--sl-color-primary-800);
`;

const Subtitle = styled.h2`
  font-size: 14px;
  font-weight: 300;
  color: var(--sl-color-primary-800);
`;

const SectionHeader = () => (
	<HeaderContainer>
		<Title>Opportunities</Title>
	</HeaderContainer>
);

export default SectionHeader;
