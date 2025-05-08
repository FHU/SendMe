import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import styled from "styled-components";

export const Route = createFileRoute("/organizations/list")({
	component: OrganizationListPage,
});

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
`;

const OrgCard = styled.div`
  background: var(--sl-color-neutral-0);
  border-radius: 12px;
  box-shadow: var(--sl-shadow-small);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

const OrgName = styled.h2`
  margin: 0 0 0.5rem;
  color: var(--sl-color-primary-800);
`;

const OrgType = styled.span`
  font-weight: bold;
  text-transform: capitalize;
`;

const OrgDesc = styled.p`
  margin-top: 0.5rem;
`;

const OrgLocation = styled.p`
  font-size: 0.9rem;
  color: var(--sl-color-gray-600);
  margin-top: 0.25rem;
`;

function OrganizationListPage() {
	const {
		data: organizations,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["organizations"],
		queryFn: async () => {
			const res = await fetch("/api/organizations");
			if (!res.ok) throw new Error("Failed to fetch organizations");
			return res.json();
		},
	});

	if (isLoading) return <PageWrapper>Loading organizations...</PageWrapper>;
	if (isError) return <PageWrapper>Failed to load organizations.</PageWrapper>;

	return (
		<PageWrapper>
			<h1>All Organizations</h1>
			{organizations.map((org: any) => (
				<OrgCard key={org.id}>
					<OrgName>{org.name}</OrgName>
					<OrgType>{org.type}</OrgType>
					<OrgDesc>{org.description}</OrgDesc>
					<OrgLocation>{org.location}</OrgLocation>
				</OrgCard>
			))}
		</PageWrapper>
	);
}
