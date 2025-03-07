// import { FaUserCircle, FaEnvelope, FaSearch } from "react-icons/fa";
import { SlIcon, SlIconButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "@tanstack/react-router";
import type React from "react";
import { BiColor } from "react-icons/bi";
import styled from "styled-components";

// Define Props (if needed)
interface NavbarProps {
	appName: string;
}

// Styled Components
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: var(--sm-hover-green);
    cursor: pointer;
  }

  &:active {
    color: var(--sm-active-green);
    }
`;

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2E8B57;
  padding: 5px 20px;
  box-shadow: var(--sl-shadow-x-large);
  color: white;
  margin: 0 auto var(--sl-spacing-4x-large) auto;
`;

const AppName = styled.h1`
  font-size: 25px;
  font-weight: bold;
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

// const UserImage = styled.img`
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   object-fit: cover;
//   cursor: pointer;
// `;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
  
  &:hover {
    color:#A0EB9F;
  }
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
					<SlIcon name="envelope" />
				</IconButton>

				<IconButton>
					{/* Where the user image will be placed. Look into having a default icon go there if there is no image */}
					<SlIcon name="person-circle" />
				</IconButton>
			</NavIcons>
		</NavbarContainer>
	);
};

export default Navbar;
