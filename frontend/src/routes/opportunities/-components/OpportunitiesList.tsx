import api, { type components } from "@sendme/api";
import styled from "styled-components";

import { SlRelativeTime } from "@shoelace-style/shoelace/dist/react";

const OpportunityBox = styled.article`
  background: var(--sl-color-neutral-0);
  padding: var(--sl-spacing-medium);
  border-radius: var(--sl-border-radius-medium);
  box-shadow: var(--sl-shadow-small);
  margin-bottom: var(--sl-spacing-medium);
`;

const TitleBar = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h5`
  flex-grow: 1;
`;

const Description = styled.div``;

export function OpportunitiesList({
  data,
}: {
  data: components["schemas"]["Opportunity"][];
}): JSX.Element {
  return (
    <>
      {data?.map((o) => (
        <OpportunityBox key={o.id}>
          <TitleBar>
            <Title>{o.name}</Title>
            <SlRelativeTime>{o.created_at}</SlRelativeTime>
          </TitleBar>
          <Description>{o.description}</Description>
        </OpportunityBox>
      ))}
    </>
  );
}
