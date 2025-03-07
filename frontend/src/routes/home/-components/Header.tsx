import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 400px;
  height: 250px;
  background-color: #E6FCE5;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 1rem;
  filter: drop-shadow(0px 10px 4px #3232324b);
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: #2E8B57;
`;

const Subtitle = styled.h2`
  font-size: 14px;
  font-weight: 300;
  color: #2E8B57;
`;

const Header = () => (
	<HeaderContainer>
		<div>
			<Title>Opportunities</Title>
		</div>
		<div>
			<Subtitle>Tags Selected</Subtitle>
		</div>
	</HeaderContainer>
);

export default Header;
