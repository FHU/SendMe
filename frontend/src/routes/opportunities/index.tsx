import { createFileRoute } from "@tanstack/react-router";
import { CreateOpportunity } from "./-components/CreateOpportunity";
import { OpportunitiesList } from "./-components/OpportunitiesList";
import api from "@sendme/api";
import styled from "styled-components";
import { SlSpinner } from "@shoelace-style/shoelace/dist/react";

export const Route = createFileRoute("/opportunities/")({
  component: RouteComponent,
});

const AreaHeading = styled.h2``;

function RouteComponent() {
  const { data, refetch } = api.opportunities.list.useQuery();
  return (
    <>
      <CreateOpportunity onCreated={refetch} />
      <AreaHeading>Opportunities</AreaHeading>
      {!data ? <SlSpinner /> : <OpportunitiesList data={data} />}
    </>
  );
}
