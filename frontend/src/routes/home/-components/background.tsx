import api from "@sendme/api";
import { SlSpinner } from "@shoelace-style/shoelace/dist/react";
import styled from "styled-components";
// import { CreateOpportunity } from "../-components/CreateOpportunity";
import { OpportunitiesList } from "../-components/OpportunitiesList";

const BackGround = styled.div`
  background: var(--sl-color-primary-500);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 30px;
  max-width: fit-content;
`;

const Background = () => {
	const { data: orgs, refetch: refetchOrg } =
		api.organizations.listOrganizations.useQuery();
	const { data, refetch } = api.opportunities.listOpportunities.useQuery();

	return (
		<BackGround>
			{/* <CreateOpportunity onCreated={refetch} /> */}

			{!data ? <SlSpinner /> : <OpportunitiesList data={data} />}
		</BackGround>
	);
};

export default Background;
