import { createFileRoute } from "@tanstack/react-router";
import { CreateOpportunity } from "./-components/CreateOpportunity";
import { OpportunitiesList } from "./-components/OpportunitieList";

import styled from "styled-components";

export const Route = createFileRoute("/opportunities/")({
  component: RouteComponent,
});

const AreaHeading = styled.h2``;

function RouteComponent() {
  return (
    <>
      <CreateOpportunity />
      <AreaHeading>Opportunities</AreaHeading>
      <OpportunitiesList />
    </>
  );
}
