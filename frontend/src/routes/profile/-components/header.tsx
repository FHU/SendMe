import {
    SlAvatar
} from "@shoelace-style/shoelace/dist/react";
import styled from "styled-components";

const HeaderContainer = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 600px;
    background-color: var(--sl-color-primary-200);
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
`;

const SLAvatar = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
`;

const ProfileUsername = styled.h1`
    text-align: center;
    padding-top: .5rem;
    padding-bottom: .5rem;
    font-size: 40px;
`;

const ConnectionNumber = styled.p`
    text-align: center;
    font-size: 10px;
`;

const Header = () => <HeaderContainer>
    <SLAvatar image="images/christian-buehner-DItYlc26zVI-unsplash.jpg"/>
    <ProfileUsername>Christian Buehner</ProfileUsername>
    <ConnectionNumber>999 Connections</ConnectionNumber>

</HeaderContainer>;

export default Header;
