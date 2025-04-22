import { SlIconButton } from "@shoelace-style/shoelace/dist/react";
import styled from "styled-components";
import projImage from "../img/proj_img.png";
import projImage1 from "../img/proj_img1.png";

const PastProjContainer = styled.div`
  background-color: white;
  padding: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  width: 400px;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
`;

const ProjectsList = styled.div`
  margin: 1rem 0rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContentText = styled.p`
  font-size: 0.9rem;
  color: #333;
  line-height: 1.4;
  margin-top: 10px;
  width: 50%;
`;

const Textarea = styled.textarea`
  font-size: 0.9rem;
  color: #333;
  width: 95%;
  height: 100px;
  margin-top: 10px;
  font-family: Arial, sans-serif;
`;

const ProjImageContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: end;
`;

const ProjImage = styled.img`
  aspect-ratio: 1/1;
  width: 50%;
  padding: 0rem 0.5rem 0rem 0rem;
`;

type PastProjProps = {
	isEditing: boolean;
};

const PastProj = ({ isEditing }: PastProjProps) => (
	<PastProjContainer>
		<Header>
			<span>Projects</span>
			{isEditing && (
				<SlIconButton
					name="plus-lg"
					label="Add Project"
					style={{ fontSize: "2rem", fontWeight: "bold" }}
				/>
			)}
		</Header>
		<ProjectsList>
			<Content>
				{isEditing ? (
					<Textarea defaultValue="I youth ministered at Pine Cone Church of Christ." />
				) : (
					<ContentText>
						I youth ministered at Pine Cone Church of Christ.
					</ContentText>
				)}
				<ProjImageContainer>
					<ProjImage src={projImage} />
				</ProjImageContainer>
			</Content>

			<Content>
				{isEditing ? (
					<Textarea defaultValue="I youth ministered at Pine Cone Church of Christ." />
				) : (
					<ContentText>
						I youth ministered at Pine Cone Church of Christ.
					</ContentText>
				)}
				<ProjImageContainer>
					<ProjImage src={projImage1} />
				</ProjImageContainer>
			</Content>
		</ProjectsList>
	</PastProjContainer>
);

export default PastProj;
