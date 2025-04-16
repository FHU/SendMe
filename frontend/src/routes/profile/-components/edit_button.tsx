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

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
`;

const EditPressButton = styled.button`
  background: #ccc;
  font-weight: bold;
  flex: 1;
  border: 2.5px solid #eee;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: var(--sl-color-primary-500);
    color: white;
  }
`;

const CancelButton = styled(EditPressButton)`
  &:hover {
    background-color: var(--sl-color-primary-500);
    color: white;
  }
`;

type EditButtonProps = {
	toggleEdit: () => void;
	isEditing: boolean;
};

const EditButton = ({ toggleEdit, isEditing }: EditButtonProps) => (
	<EditContainer>
		<ButtonRow>
			<EditPressButton onClick={toggleEdit}>
				{isEditing ? "Save" : "Edit Profile"}
			</EditPressButton>
			{isEditing && <CancelButton onClick={toggleEdit}>Cancel</CancelButton>}
		</ButtonRow>
	</EditContainer>
);

export default EditButton;
