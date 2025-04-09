import api from "@sendme/api";
import { useCallback } from "react";
import styled from "styled-components";

const Heading = styled.h3``;

const Form = styled.form`
  background: var(--sl-color-neutral-0);
  padding: var(--sl-spacing-medium);
  border-radius: var(--sl-border-radius-medium);
  box-shadow: var(--sl-shadow-small);
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-top: var(--sl-spacing-medium);
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: var(--sl-spacing-small);
  margin-top: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

// Changed from "ToTheRight" to "ButtonContainer" with centered alignment.
const ButtonContainer = styled.div`
  margin-top: var(--sl-spacing-medium);
  display: flex;
  justify-content: center;
`;

// A custom submit button with a light green transparent background.
const SubmitButton = styled.button`
  background-color: rgba(144, 238, 144, 0.5); /* Light green transparent */
  border: none;
  border-radius: 4px;
  padding: var(--sl-spacing-small) var(--sl-spacing-medium);
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
  
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

			// Only "name" and "description" are sent. You can add more once your API supports these fields.
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

			<Label htmlFor="name">Title</Label>
			<Input id="name" name="name" type="text" disabled={isPending} />

			<Label htmlFor="description">Description</Label>
			<Input
				id="description"
				name="description"
				type="text"
				disabled={isPending}
			/>

			<Label htmlFor="tags">Tags</Label>
			<Input id="tags" name="tags" type="text" disabled={isPending} />

			<Label htmlFor="summary">Summary</Label>
			<Input id="summary" name="summary" type="text" disabled={isPending} />

			<Label htmlFor="location">Location</Label>
			<Input id="location" name="location" type="text" disabled={isPending} />

			<Label htmlFor="eventDate">Event Date</Label>
			<Input id="eventDate" name="eventDate" type="date" disabled={isPending} />

			<Label htmlFor="eventTime">Event Time</Label>
			<Input id="eventTime" name="eventTime" type="time" disabled={isPending} />

			<Label htmlFor="position">Position</Label>
			<Input id="position" name="position" type="text" disabled={isPending} />

			<ButtonContainer>
				<SubmitButton type="submit" disabled={isPending}>
					{isPending ? "Sharing..." : "Share"}
				</SubmitButton>
			</ButtonContainer>
		</Form>
	);
}
