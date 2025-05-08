import api from "@sendme/api";
import { p } from "node_modules/react-router/dist/development/fog-of-war-CvttGpNz";
import { useState } from "react";
import styled from "styled-components";
import SectionHeaderOrgs from "./SectionHeaderOrgs"; // Adjust path if needed

const RoundedContainer = styled.div`
  background-color: var(--sl-color-primary-500);
  border-radius: 16px;
  padding: 16px;
  margin-top: 5rem; // Added spacing below header
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

const Select = styled.select`
  display: block;
  width: 100%;
  padding: var(--sl-spacing-small);
  margin-top: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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

export function CreateOrganizationForm() {
	const [name, setName] = useState("");
	const [category, setCategory] = useState("");
	const [description, setDescription] = useState("");
	const {
		mutateAsync: createOrganization,
		isPending: isSubmitting,
		isError,
		isSuccess,
	} = api.organizations.createOrganization.useMutation();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		console.log({ name, category, description });

		try {
			await createOrganization({
				body: { name, type: category, description, location: "Placeholder" },
			});
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<SectionHeaderOrgs />
			<RoundedContainer>
				<Form onSubmit={handleSubmit}>
					<Heading>Create Organization</Heading>

					<Label htmlFor="name">Organization Name</Label>
					<Input
						id="name"
						name="name"
						type="text"
						placeholder="Enter organization name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						disabled={isSubmitting}
						required
					/>

					<Label htmlFor="category">Category</Label>
					<Select
						id="category"
						name="category"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						disabled={isSubmitting}
						required
					>
						<option value="">Select a category</option>
						<option value="Business">Business</option>
						<option value="Education">Education</option>
						<option value="Non-Profit">Non-Profit</option>
						<option value="Technology">Technology</option>
						<option value="Health">Health</option>
					</Select>

					<Label htmlFor="description">Description</Label>
					<Input
						id="description"
						name="description"
						type="text"
						placeholder="Enter description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						disabled={isSubmitting}
					/>

					<ButtonContainer>
						<SubmitButton type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Creating..." : "Create Organization"}
						</SubmitButton>
					</ButtonContainer>
				</Form>
				{isError && <p>{"An error occurred"}</p>}
				{isSuccess && <p>{"Organization created successfully"}</p>}
			</RoundedContainer>
		</>
	);
}
