import { SlAvatar, SlIcon } from "@shoelace-style/shoelace/dist/react";
import { Link } from "@tanstack/react-router";
import type React from "react";
import styled from "styled-components";

// Define Props (if needed)
interface NavbarProps {
	appName: string;
}

// Styled Components
const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;

  &:hover {
    color: var(--sl-color-primary-700);
    cursor: pointer;
  }

  &:active {
    color: var(--sl-color-primary-400);
    }
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--sl-color-primary-500);
  padding: 5px 20px;
  box-shadow: var(--sl-shadow-x-large);
  color: white;
  margin: 0 auto var(--sl-spacing-4x-large) auto;
 
`;

const AppName = styled.h1`
  font-size: 28px;
  font-weight: bold;
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 150px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  width: 48px;
  height: 48px;
  color: white;
  font-size: 2.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: var(--sl-color-primary-700);
  }
`;

// Eventually make this clickable to go to user profile
const AvatarIcon = styled.div`
  display: flex;
  align-items: center;
`;

// Component
const Navbar: React.FC<NavbarProps> = ({ appName }) => {
	return (
		<NavbarContainer>
			<StyledLink to="/">
				<AppName>{appName}</AppName>
			</StyledLink>

			<NavIcons>
				<IconButton>
					<SlIcon name="search" />
				</IconButton>

				<IconButton>
					<SlIcon name="chat-right" />
				</IconButton>

				<AvatarIcon>
					<SlAvatar
						image="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=800"
						label="Avatar of a gray tabby kitten looking down"
					/>
				</AvatarIcon>
			</NavIcons>
		</NavbarContainer>
	);
};

export default Navbar;
