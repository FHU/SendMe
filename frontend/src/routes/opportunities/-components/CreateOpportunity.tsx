import api from "@sendme/api";
import { SlButton, SlInput } from "@shoelace-style/shoelace/dist/react";
import { useCallback } from "react";
import styled from "styled-components";

const Heading = styled.h3``;

const Form = styled.form`
  background: var(--sl-color-neutral-0);
  padding: var(--sl-spacing-medium);
  border-radius: var(--sl-border-radius-medium);
  box-shadow: var(--sl-shadow-small);
`;

const Input = styled(SlInput)`
  margin-top: var(--sl-spacing-medium);
`;

const ToTheRight = styled.div`
  margin-top: var(--sl-spacing-medium);
  display: flex;
  justify-content: flex-end;
`;

type ExtendedOpportunityPayload = {
  name: string;
  tags: string;
  summary: string;
  position: string;
  description: string;
  timeOfEvent: string;
};

export function CreateOpportunity({ onCreated }: { onCreated: () => void }): JSX.Element {
  const { mutateAsync, isPending } = api.opportunities.create.useMutation();

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      // Build full payload from form data
      const fullPayload: ExtendedOpportunityPayload = {
        name: formData.get("name")?.toString() || "",
        tags: formData.get("tags")?.toString() || "",
        summary: formData.get("summary")?.toString() || "",
        position: formData.get("position")?.toString() || "",
        description: formData.get("description")?.toString() || "",
        timeOfEvent: formData.get("timeOfEvent")?.toString() || "",
      };

      // Only send the properties the mutation endpoint expects.
      const minimalPayload = {
        name: fullPayload.name,
        description: fullPayload.description,
      };

      mutateAsync({ body: minimalPayload }).then(() => {
        onCreated();
      });
    },
    [mutateAsync, onCreated]
  );

  return (
    <Form onSubmit={onSubmit}>
      <Heading>Share Opportunity</Heading>
      <Input disabled={isPending} label="Opportunity Title" name="name" />
      <Input disabled={isPending} label="Tags" name="tags" />
      <Input disabled={isPending} label="Short Summary" name="summary" />
      <Input disabled={isPending} label="Position" name="position" />
      <Input disabled={isPending} label="Description" name="description" />
      <Input
        disabled={isPending}
        label="Time of Event"
        name="timeOfEvent"
        type="time"
      />
      <ToTheRight>
        <SlButton type="submit" loading={isPending}>
          Share
        </SlButton>
      </ToTheRight>
    </Form>
  );
}
