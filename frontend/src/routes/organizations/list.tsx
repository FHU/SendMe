import api from "@sendme/api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SectionHeaderOrgs from "./-components/SectionHeaderOrgs";

export const Route = createFileRoute("/organizations/list")({
	component: RouteComponent,
});

const PageWrapper = styled.div`
  margin: 6rem auto 2rem auto;
  max-width: 700px;
  padding: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const OrgCard = styled.div`
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--sl-color-neutral-0);
  box-shadow: var(--sl-shadow-small);
  margin-bottom: 1rem;
`;

const OrgName = styled.h3`
  margin: 0 0 0.5rem 0;
  color: var(--sl-color-primary-600);
`;

const OrgDetail = styled.p`
  margin: 0.25rem 0;
  font-size: 0.95rem;
`;

type Organization = {
	id: string;
	name: string;
	description: string;
	location: string;
	type: string;
	created_at: string;
};

function RouteComponent() {
	const { data, isLoading, isError } =
		api.organizations.listOrganizations.useQuery();
	const [orgs, setOrgs] = useState<Organization[]>([]);

	useEffect(() => {
		if (data) {
			try {
				const stored = localStorage.getItem("new-orgs");
				const parsed = stored ? JSON.parse(stored) : [];
				setOrgs([...data, ...parsed]);
			} catch {
				setOrgs(data);
			}
		}
	}, [data]);

	return (
		<>
			<SectionHeaderOrgs />
			<PageWrapper>
				<Title>All Organizations</Title>

				{isLoading && <OrgCard>Loading...</OrgCard>}
				{isError && <OrgCard>Error loading organizations.</OrgCard>}

				{orgs && orgs.length > 0
					? orgs.map((org) => (
							<OrgCard key={org.id}>
								<OrgName>{org.name}</OrgName>
								<OrgDetail>
									<strong>Type:</strong> {org.type}
								</OrgDetail>
								<OrgDetail>
									<strong>Location:</strong> {org.location}
								</OrgDetail>
								<OrgDetail>
									<strong>Description:</strong> {org.description}
								</OrgDetail>
								<OrgDetail>
									<small>
										Created at: {new Date(org.created_at).toLocaleString()}
									</small>
								</OrgDetail>
							</OrgCard>
						))
					: !isLoading &&
						!isError && <OrgCard>No organizations found.</OrgCard>}
			</PageWrapper>
		</>
	);
}
