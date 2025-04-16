import { SlIconButton } from "@shoelace-style/shoelace/dist/react";
import styled from "styled-components";

const InfoContainer = styled.div`
  background-color: white;
  padding: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  width: 400px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
`;

const Content = styled.p`
  font-size: 0.9rem;
  color: #333;
  line-height: 1.4;
  margin-top: 10px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Icon = styled.a`
  font-size: 1.5rem;
  color: black;
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }
`;

const Info = () => (
	<InfoContainer>
		<Header>
			<span>About Me</span>
		</Header>
		<Content>
			As a graduate from Freed-Hardeman University, I managed all aspects from
			logistics to program development. My work with local outreach events
			involved coordinating volunteers, securing resources, and building
			relationships with community partners. These experiences honed my
			leadership, organizational, and communication skills.
		</Content>
		<SocialIcons>
			<SlIconButton name="facebook" label="Facebook" />
			<SlIconButton name="tiktok" label="Tiktok" />
			<SlIconButton name="linkedin" label="LinkedIn" />
			<SlIconButton name="twitter-x" label="X" />
		</SocialIcons>
	</InfoContainer>
);

export default Info;
