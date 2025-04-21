import api from "@sendme/api";
import { SlIcon, SlIconButton } from "@shoelace-style/shoelace/dist/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 400px;
  height: 250px;
  background-color: var(--sl-color-primary-100);
  border-bottom-left-radius: 1.5rem;
	border-bottom-right-radius: 1.5rem;
  padding: 1rem;
  filter: drop-shadow(0px 10px 4px #3232324b);
`;

const AddButton = styled(SlIconButton)`
  background: var(--sl-color-primary-500);
  border: none;
  border-radius: 50%;
  margin-top: 1rem;
  padding: 0.5rem;
  color: var(--sl-color-primary-950);
  font-size: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  `;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 500;
  color: var(--sl-color-primary-800);
  margin-bottom: 0;
`;

// const AddButton = styled(SlIconButton)`
//   background: var(--sl-color-primary-500);
//   border: none;
//   border-radius: 50%;
//   margin-top: 1rem;
//   padding: 0.5rem;
//   color: var(--sl-color-primary-950);
//   font-size: 30px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
// `;

const Subtitle = styled.h2`
  font-size: 14px;
  font-weight: 300;
  color: var(--sl-color-primary-800);
  margin-top:0.25rem;
`;

const Header = () => {
	const { data: orgs, refetch: refetchOrg } =
		api.organizations.listOrganizations.useQuery();
	const { data, refetch } = api.opportunities.listOpportunities.useQuery();

	const [active, setActive] = useState(false); // State for toggling popup
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null); // State for the anchor element

	const handleClick = (e: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(e.currentTarget); // Set the anchor element when AddButton is clicked
		setActive((prev) => !prev); // Toggle the popup
	};

	return (
		<HeaderContainer>
			<TitleRow>
				<Title>Opportunities</Title>
				<Link to="/home">
					<AddButton name="plus-lg" onClick={handleClick}>
						<SlIcon name="plus-lg" />
					</AddButton>
				</Link>
			</TitleRow>
			<Subtitle>Tags Selected</Subtitle>
		</HeaderContainer>
	);
};

export default Header;
