import styled from "styled-components";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 480px;
    background-color: var(--sl-color-primary-500);
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
`;

const AvatarImg = styled.img`
    border-radius: 50%;
    height: 250px;
    width: 250px;
    margin-top: 50px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    object-fit: cover;
`;

const ProfileUsername = styled.h1`
    text-align: center;
    font-size: 40px;
    color: white;
    line-height: 0;
`;

const ConnectionNumber = styled.p`
    text-align: center;
    font-size: 15px;
    color: white;
    padding-bottom: 30px;
    line-height: 0;
`;

const Header = () => (
	<HeaderContainer>
		<AvatarImg src="images/christian-buehner-DItYlc26zVI-unsplash.jpg" alt="" />

		<ProfileUsername>Christian Buehner</ProfileUsername>
		<ConnectionNumber>999 Connections</ConnectionNumber>
	</HeaderContainer>
);

const Header = () => <HeaderContainer />;

export default Header;
