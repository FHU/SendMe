import React from "react";
import styled from "styled-components";
// import { FaUserCircle, FaEnvelope, FaSearch } from "react-icons/fa";
import { SlIcon, SlIconButton } from "@shoelace-style/shoelace/dist/react";

// Define Props (if needed)
interface NavbarProps {
  appName: string;
}

// Styled Components
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #BE5D14;
  padding: 5px 20px;
  color: white;
  width: 100%;
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

const UserImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
  
  &:hover {
    color: #f39c12;
  }
`;

// Component
const Navbar: React.FC<NavbarProps> = ({ appName }) => {
  return (
    <NavbarContainer>
      <AppName>{appName}</AppName>
      <NavIcons>
        <IconButton>
          <SlIcon name="search" />
        </IconButton>

        <IconButton>
          <SlIcon name="envelope" />
        </IconButton>

        <IconButton>
          <UserImage src="" alt=""/>
        </IconButton>
      </NavIcons>
    </NavbarContainer>
  );
};

export default Navbar;
