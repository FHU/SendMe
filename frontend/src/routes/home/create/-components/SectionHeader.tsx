import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 35.5rem;
  height: 250px;
  position: absolute;
  top: 0;
  margin-top: 4.5rem;
  z-index: var(--section-header-z-index);
  background-color: var(--section-header-background-color);
  border-bottom-left-radius: var(--section-header-border-radius);
  border-bottom-right-radius: var(--section-header-border-radius);
  padding: var(--section-header-padding);
  filter: drop-shadow(var(--section-header-drop-shadow));
`;


const Title = styled.h1`
  font-size: var(--section-header-title-font-size);
  font-weight: var(--section-header-title-font-weight);
  color: var(--section-header-text-color);
`;

const Subtitle = styled.h2`
  font-size: var(--section-header-subtitle-font-size);
  font-weight: var(--section-header-subtitle-font-weight);
  color: var(--section-header-text-color);
`;



const SectionHeader = () => (
	<HeaderContainer>
		<Title>Opportunities</Title>
	</HeaderContainer>
);

export default SectionHeader;
