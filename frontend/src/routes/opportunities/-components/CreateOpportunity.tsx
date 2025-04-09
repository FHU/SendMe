import api from "@sendme/api";
import { SlButton, SlInput } from "@shoelace-style/shoelace/dist/react";
import { useCallback, useState } from "react";
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

export function CreateOpportunity({ onCreated }: { onCreated: () => void }) {
	const { mutateAsync, isPending } = api.opportunities.create.useMutation();

	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const formData = new FormData(e.currentTarget);

			mutateAsync({
				body: {
					name: formData.get("name")?.toString() || "",
					description: formData.get("description")?.toString() || "",
				},
			}).then(() => {
				onCreated();
			});
		},
		[mutateAsync, onCreated],
	);

	return (
		<Form onSubmit={onSubmit}>
			<Heading>Share Opportunity</Heading>
			<Input disabled={isPending} label="Title" name="name" placeholder="Enter the title" />
			<Input disabled={isPending} label="Description" name="description" placeholder="Enter a brief description" />
			<Input disabled={isPending} label="Tags" name="tags" placeholder="Enter relevant tags" />
			<Input disabled={isPending} label="Summary" name="summary" placeholder="Enter a short summary" />
			<Input disabled={isPending} label="Location" name="location" placeholder="Enter the location" />
			<Input disabled={isPending} label="Event Date" name="eventDate" placeholder="Enter the event date" />
			<Input disabled={isPending} label="Event Time" name="eventTime" placeholder="Enter the event time" />
			<Input disabled={isPending} label="Position" name="position" placeholder="Enter the position" />
			<ToTheRight>
				<SlButton type="submit" loading={isPending}>
					Share
				</SlButton>
			</ToTheRight>
		</Form>
	);
}
