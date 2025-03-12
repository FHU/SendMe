import styled from "styled-components";

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #E6FCE5;
  padding: 1rem;
`;

const AttributesCont = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Attribute = styled.a`
    font-size: 14px;
    text-decoration: none;
    color: #2E8B57;
    margin: 1rem;
`;

const Sitetitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  color: #2E8B57;
`;

const Footer = () => (
	<FooterContainer>
		<AttributesCont>
			<Attribute href="#">About</Attribute>
			<Attribute href="#">Accessibility</Attribute>
			<Attribute href="#">Help Center</Attribute>
			<Attribute href="#">Privacy & Terms</Attribute>
			<Attribute href="#">More</Attribute>
		</AttributesCont>
		<Sitetitle>Sendme &copy; 2025</Sitetitle>
	</FooterContainer>
);

export default Footer;
