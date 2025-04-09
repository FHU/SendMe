
import styled from "styled-components";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 440px;
    background-color: var(--sl-color-primary-500);
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
`;

const AvatarImg = styled.image`
    border-radius: 50%;

`;

const ProfileUsername = styled.h1`
    text-align: center;
    padding-top: 0;
    padding-bottom: 0;
    font-size: 30px;
    color: white;
`;

const ConnectionNumber = styled.p`
    text-align: center;
    font-size: 15px;
    color: white;
`;

const Header = () => <HeaderContainer>
    <AvatarImg>
        <img src="images/christian-buehner-DItYlc26zVI-unsplash.jpg" alt=""/>
    <AvatarImg/>
    <ProfileUsername>Christian Buehner</ProfileUsername>
    <ConnectionNumber>999 Connections</ConnectionNumber>

</HeaderContainer>;

export default Header;
