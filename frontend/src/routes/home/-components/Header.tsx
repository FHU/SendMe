import styled from 'styled-components';
import { SlButton, SlCard, SlDetails, SlTag, SlAvatar, SlIconButton, SlIcon } from "@shoelace-style/shoelace/dist/react";

const HeaderContainer = styled(SlCard)`
  max-width: 400px;
  background-color: #F6CFB1;
`;

const HeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderSubtitle = styled.div`
  display: flex
  justify-content: space-between;
`;

const StrongText = styled.strong`
  font-size: 36px;
`;

const MediumText = styled.strong`
  font-size: 14px;
`;

const Header = () => (
    <HeaderContainer>
        <HeaderTitle>
            <div>
                <StrongText>Opportunities</StrongText>
            </div>
        </HeaderTitle>
		<HeaderSubtitle>
            <div>
                <MediumText>Tags Selected</MediumText>
            </div>
        </HeaderSubtitle>
    </HeaderContainer>
);

export default Header;