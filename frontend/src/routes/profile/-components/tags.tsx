import { SlIconButton } from "@shoelace-style/shoelace/dist/react";
import styled from "styled-components";

const TagsContainer = styled.div`
  background-color: white;
  padding: 15px;
  font-family: Arial, sans-serif;
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TagButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TagButton = styled.button`
  border-radius: 2rem;
  border: none;
  background-color: var(--sl-color-primary-500);
  padding: 0.2rem 0.5rem;
  margin: 0rem 0.1rem;
  color: white;
  font-size: 12px;
  height: 1.5rem;
  width: 74px;
  cursor: pointer;
`;

const EditContainer = styled.div`
  text-align: right;
  font-size: 1.2rem;
`;

const Tags = ({ isEditing }: { isEditing: boolean }) => (
	<TagsContainer>
		<TagButtons>
			<TagButton>Preacher</TagButton>
			<TagButton>Youth</TagButton>
			<TagButton>Spanish</TagButton>
			<TagButton>Paid</TagButton>
		</TagButtons>
		<EditContainer>
			{isEditing && (
				<SlIconButton
					name="plus-circle"
					label="Add tag"
					style={{ fontSize: "2rem", fontWeight: "bold" }}
				/>
			)}
		</EditContainer>
	</TagsContainer>
);

export default Tags;
