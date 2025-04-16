import { useState } from "react";
import styled from "styled-components";
import EditButton from "./edit_button";
import Header from "./header";
import Info from "./info";
import PastProj from "./past_proj";
import Tags from "./tags";

const BackGround = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: fit-content;
`;

const Background = () => {
	const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => {
		setIsEditing((prev) => !prev);
	};

	return (
		<BackGround>
			<Header />
			<EditButton toggleEdit={toggleEdit} isEditing={isEditing} />
			<Tags isEditing={isEditing} />
			<Info isEditing={isEditing} />
			<PastProj isEditing={isEditing} />
		</BackGround>
	);
};

export default Background;
