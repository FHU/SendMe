import styled from "styled-components";

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--sl-color-primary-100);
    width: 400px;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    padding: 1rem;
    filter: drop-shadow(0px 10px 4px #3232324b);
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

export default Header;
