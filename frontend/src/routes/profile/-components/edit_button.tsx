import { SlIconButton } from "@shoelace-style/shoelace/dist/react";
import styled from "styled-components";

const EditContainer = styled.div`
  background-color: white;
  padding: 15px;
  font-family: Arial, sans-serif;
  width: 400px;
  display: flex;
  margin-top: 16rem;
  justify-content: center;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

const EditPressButton = styled.button`
    background: #ccc;
    font-weight: bold;
    width: 90%;
    border: 2.5px solid #eee;
    border-radius: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
`;

type EditButtonProps = {
	toggleEdit: () => void;
	isEditing: boolean;
};

const EditButton = ({ toggleEdit, isEditing }: EditButtonProps) => (
	<EditContainer>
		<EditPressButton onClick={toggleEdit}>
			{isEditing ? "Save" : "Edit Profile"}
		</EditPressButton>
	</EditContainer>
);

export default EditButton;
