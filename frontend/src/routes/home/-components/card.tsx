import api from "@sendme/api";
import {
	SlAvatar,
	SlButton,
	SlCard,
	SlDetails,
	SlIcon,
	SlIconButton,
	SlTag,
} from "@shoelace-style/shoelace/dist/react";
import { SlSpinner } from "@shoelace-style/shoelace/dist/react";
// import { useQuery } from "@tanstack/react-query";
import {
	JSXElementConstructor,
	Key,
	ReactElement,
	ReactNode,
	ReactPortal,
} from "react";
import styled from "styled-components";
import { OpportunitiesList } from "../../opportunities/-components/OpportunitiesList";

const CardContainer = styled(SlCard)`
  display: flex;
  max-width: 400px;
  --border-radius: 30px;
  margin: 5px;
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardTitleDate = styled.div`
	display: flex;
	flex-direction: column;
`;

const StrongText = styled.strong`
  font-size: 30px;
`;

const AvatarSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const AvatarInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const AvatarBio = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const SmallBio = styled.div`
	padding-bottom: 1rem;
`;

const MoreDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Bookmark = styled.div`
  .icon-button-color sl-icon-button::part(base) {
    color: black;
  }

  .icon-button-color sl-icon-button::part(base):hover,
  .icon-button-color sl-icon-button::part(base):focus {
    color: black;
  }

  .icon-button-color sl-icon-button::part(base):active {
    color: var(--sl-color-primary-700);
  }
  `;

const Card = () => {
	const { data: orgs, refetch: refetchOrg } =
		api.organizations.listOrganizations.useQuery();
	const { data, refetch } = api.opportunities.listOpportunities.useQuery();
	return <>{!data ? <SlSpinner /> : <OpportunitiesList data={data} />}</>;
};
export default Card;
