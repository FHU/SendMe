import api from "@sendme/api";
import { SlIconButton, SlSpinner } from "@shoelace-style/shoelace/dist/react";
import { useState } from "react";
import styled from "styled-components";
import { OpportunitiesList } from "../-components/OpportunitiesList";

const BackGround = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  max-width: fit-content;
  z-index: 10;
  background-color: var(--sl-color-primary-500);
  margin: -125px;
  margin-bottom: 125px;
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

const PopupContent = styled.div`
  width: 100px;
  height: 50px;
  background: var(--sl-color-primary-600);
  border-radius: var(--sl-border-radius-medium);
`;

const Background = () => {
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
		<>
			<BackGround>
				{!data ? <SlSpinner /> : <OpportunitiesList data={data} />}
			</BackGround>
		</>
	);
};

export default Background;
