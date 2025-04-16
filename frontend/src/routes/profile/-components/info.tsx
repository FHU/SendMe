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

const Info = ({ isEditing }: { isEditing: boolean }) => (
	<InfoContainer>
		<Header>
			<span>About Me</span>
		</Header>
		{isEditing ? (
			<textarea
				style={{
					width: "100%",
					height: "100px",
					fontFamily: "Arial",
					fontSize: "0.9rem",
					color: "#333",
				}}
				defaultValue="As a graduate from Freed-Hardeman University, I managed all aspects..."
			/>
		) : (
			<Content>
				As a graduate from Freed-Hardeman University, I managed all aspects...
			</Content>
		)}
		<SocialIcons>
			<SlIconButton href="#" name="facebook" label="Facebook" />
			<SlIconButton href="#" name="tiktok" label="Tiktok" />
			<SlIconButton href="#" name="linkedin" label="LinkedIn" />
			<SlIconButton href="#" name="twitter-x" label="X" />
		</SocialIcons>
	</InfoContainer>
);

export default Info;
