import React from "react";
import styled from "styled-components";
import { SlIcon, SlAvatar } from "@shoelace-style/shoelace/dist/react";
// import { BiColor } from "react-icons/bi";

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
  gap: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  
  &:hover {
    color: #f39c12;
  }
`;

const AvatarIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  width: 32px;
  height: 32px;
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
          <SlIcon name="chat-right" />
        </IconButton>

        <AvatarIcon>
            {/* Where the user image will be placed. Look into having a default icon go there if there is no image */}
            {/* <SlIcon name="person-circle" /> */}
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
