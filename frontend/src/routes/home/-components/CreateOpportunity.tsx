import api from "@sendme/api";
import { useCallback } from "react";
import styled from "styled-components";

const RoundedContainer = styled.div`
  background-color: var(--sl-color-primary-500);
  border-radius: 16px;
  padding: 16px;
`;

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

const TextArea = styled.textarea`
  display: block;
  width: 100%;
  padding: var(--sl-spacing-small);
  margin-top: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
  min-height: 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: var(--sl-spacing-small);
  margin-top: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

// Container for date and time under "Time of Event"
const TimeOfEventContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.25rem;
`;

const ButtonContainer = styled.div`
  margin-top: var(--sl-spacing-medium);
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  background-color: rgba(144, 238, 144, 0.5);
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
			console.log({
				organization: formData.get("organization")?.toString() || "",
				contact_user: formData.get("contact_user")?.toString() || "",
				location: formData.get("location")?.toString() || "",
				tags: formData.get("tags")?.toString() || "",
				summary: formData.get("summary")?.toString() || "",
				position: formData.get("position")?.toString() || "",
				description: formData.get("description")?.toString() || "",
				eventDate: formData.get("eventDate")?.toString() || "",
				eventTime: formData.get("eventTime")?.toString() || "",
			});
			onCreated();
		},
		[onCreated],
	);

	return (
		<RoundedContainer>
			<Form onSubmit={onSubmit}>
				<Heading>Share Opportunity</Heading>

				{/* 1. Organization (required) */}
				<Label htmlFor="organization">Organization (required)</Label>
				<Select id="organization" name="organization" disabled={isPending}>
					<option value="FHU">FHU</option>
					<option value="Henderson Church of Christ">
						Henderson Church of Christ
					</option>
				</Select>

				{/* 2. Contact User (required) */}
				<Label htmlFor="contact_user">Contact User (required)</Label>
				<Input
					id="contact_user"
					name="contact_user"
					type="text"
					placeholder="Enter contact user info"
					disabled={isPending}
				/>

				{/* 3. Location (City, State, Country) (required) */}
				<Label htmlFor="location">
					Location (City, State, Country) (required)
				</Label>
				<Input
					id="location"
					name="location"
					type="text"
					placeholder="Enter location"
					disabled={isPending}
				/>

				{/* 4. Tags (required) */}
				<Label htmlFor="tags">Tags (required)</Label>
				<Input
					id="tags"
					name="tags"
					type="text"
					placeholder="Enter tags (comma separated)"
					disabled={isPending}
				/>

				{/* 5. Summary (required) */}
				<Label htmlFor="summary">Summary (required)</Label>
				<TextArea
					id="summary"
					name="summary"
					placeholder="Enter summary"
					disabled={isPending}
				/>

				{/* 6. Description (required) */}
				<Label htmlFor="description">Description (required)</Label>
				<TextArea
					id="description"
					name="description"
					placeholder="Enter description"
					disabled={isPending}
				/>

				<ButtonContainer>
					<SubmitButton type="submit" disabled={isPending}>
						{isPending ? "Sharing..." : "Share"}
					</SubmitButton>
				</ButtonContainer>
			</Form>
		</RoundedContainer>
	);
}
