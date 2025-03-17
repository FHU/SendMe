import {
	SlAvatar,
	SlButton,
	SlCard,
	SlDetails,
	SlIcon,
	SlIconButton,
	SlTag,
} from "@shoelace-style/shoelace/dist/react";
import cardData from "public/data/cardData.json";
import styled from "styled-components";

const CardContainer = styled(SlCard)`
  display: flex;
  max-width: 400px;
  --border-radius: 30px;
  margin: 5px;
`;

const CardTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StrongText = styled.strong`
  font-size: 30px;
`;

const AvatarSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AvatarInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const MoreDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const Bookmark = styled.div`
  .icon-button-color sl-icon-button::part(base) {
    color: black;
  }

  .icon-button-color sl-icon-button::part(base):hover,
  .icon-button-color sl-icon-button::part(base):focus {
    color: black;
  }

  .icon-button-color sl-icon-button::part(base):active {
    color:rgb(18, 203, 98);
  }
  `;

const Card = ({ index }: { index: number }) => (
	<CardContainer>
		<CardTitle>
			<div>
				<StrongText>{cardData.title[index.toString()]}</StrongText>
				<br />
				<small>{cardData.date[index.toString()]}</small>
			</div>
			<Bookmark>
				<div className="icon-button-color">
					<SlIconButton color="green" name="bookmark" label="Bookmark" />
				</div>
			</Bookmark>
		</CardTitle>
		<br />
		<AvatarSection>
			<AvatarInfo>
				<SlAvatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" />
				<div>
					{cardData.firstName[index.toString()]} {cardData.lastName[index.toString()]}
					<br />
					<small>{cardData.organization[index.toString()]}</small>
					<br />
					<small>{cardData.location[index.toString()]}</small>
				</div>
			</AvatarInfo>
			<SlButton variant="success" size="large" outline>
				<SlIcon slot="prefix" name="envelope" color="green" />
				Message
			</SlButton>
		</AvatarSection>
		<br />
		<TagsContainer>
			<SlTag variant="success" size="medium" pill>
				{cardData.tag1[index.toString()]}
			</SlTag>
			<SlTag variant="success" size="medium" pill>
				{cardData.tag2[index.toString()]}
			</SlTag>
			<SlTag variant="success" size="medium" pill>
				{cardData.tag3[index.toString()]}
			</SlTag>
			<SlTag variant="success" size="medium" pill>
				{cardData.tag4[index.toString()]}
			</SlTag>
			<SlTag variant="success" size="medium" pill>
				{cardData.tag5[index.toString()]}
			</SlTag>
		</TagsContainer>
		<br />
		<div>{cardData.shortDescription[index.toString()]}</div>
		<br />
		<SlDetails summary="More Details">
			<MoreDetails>
				<div>
					<h3>Position</h3>
					<p>{cardData.position[index.toString()]}</p>
				</div>
				<div>
					<h3>Description</h3>
					<p>{cardData.longDescription[index.toString()]}</p>
				</div>
				<div>
					<h3>Time of Event</h3>
					<p>N/A</p>
				</div>
			</MoreDetails>
		</SlDetails>
	</CardContainer>
);

export default Card;
