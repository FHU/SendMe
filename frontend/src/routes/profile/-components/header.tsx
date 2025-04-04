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
`

const Header = () => <HeaderContainer>
    <SLAvatar></SLAvatar>
</HeaderContainer>;

export default Header;
