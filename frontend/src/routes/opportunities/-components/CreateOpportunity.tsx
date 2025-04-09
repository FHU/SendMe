import api from "@sendme/api";
import { useCallback } from "react";
import styled from "styled-components";
import { SlInput } from "@shoelace-style/shoelace/dist/react";

const Heading = styled.h3`
  margin-bottom: var(--sl-spacing-medium);
`;

const Form = styled.form`
  background: var(--sl-color-neutral-0);
  padding: var(--sl-spacing-medium);
  border-radius: var(--sl-border-radius-medium);
  box-shadow: var(--sl-shadow-small);
  display: flex;
  flex-direction: column;
  gap: var(--sl-spacing-medium);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  background-color: rgba(144, 238, 144, 0.5); /* Light green transparent */
  border: none;
  border-radius: 4px;
  padding: var(--sl-spacing-small) var(--sl-spacing-medium);
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(144, 238, 144, 0.7);
  }

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
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

			<SlInput
				name="name"
				label="Title"
				placeholder="Enter title"
				disabled={isPending}
			/>

			<SlInput
				name="description"
				label="Description"
				placeholder="Enter description"
				disabled={isPending}
			/>

			<SlInput
				name="tags"
				label="Tags"
				placeholder="Enter tags (separated by commas)"
				disabled={isPending}
			/>

			<SlInput
				name="summary"
				label="Summary"
				placeholder="Enter summary"
				disabled={isPending}
			/>

			<SlInput
				name="location"
				label="Location"
				placeholder="Enter location"
				disabled={isPending}
			/>

			<SlInput
				name="eventDate"
				label="Event Date"
				type="date"
				disabled={isPending}
			/>

			<SlInput
				name="eventTime"
				label="Event Time"
				type="time"
				disabled={isPending}
			/>

			<SlInput
				name="position"
				label="Position"
				placeholder="Enter position"
				disabled={isPending}
			/>

			<ButtonContainer>
				<SubmitButton type="submit" disabled={isPending}>
					{isPending ? "Sharing..." : "Share"}
				</SubmitButton>
			</ButtonContainer>
		</Form>
	);
}