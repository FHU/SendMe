import {
	SlAvatar,
	SlButton,
	SlCard,
	SlDetails,
	SlIcon,
	SlIconButton,
	SlTag,
} from "@shoelace-style/shoelace/dist/react";
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
    color: var(--sl-color-primary-700);
  }
  `;

const Card = () => (
	<CardContainer>
		<CardTitle>
			<div>
				<StrongText>Ministry Leadership</StrongText>
				<br />
				<small>12/14/24</small>
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
					Liam Carter
					<br />
					<small>Oak Tree Church of Christ</small>
					<br />
					<small>Dallas, TX, USA</small>
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
				Preacher
			</SlTag>
			<SlTag variant="success" size="medium" pill>
				Youth
			</SlTag>
			<SlTag variant="success" size="medium" pill>
				Education
			</SlTag>
			<SlTag variant="success" size="medium" pill>
				Leadership
			</SlTag>
			<SlTag variant="success" size="medium" pill>
				Paid
			</SlTag>
		</TagsContainer>
		<br />
		<div>Youth Ministry experience needed at Oak Tree Church of Christ!</div>
		<br />
		<SlDetails summary="More Details">
			<MoreDetails>
				<div>
					<h3>Position</h3>
					<p>Ministry Leadership and Staff</p>
				</div>
				<div>
					<h3>Description</h3>
					<p>
						Our congregation is holding sessions for spirituality in different
						facets of life, and we are seeking someone knowledgeable in
						psychology and/or sociology for this job. There will be two days of
						sessions, and we would like anyone who has availability for these
						times. Thank you!
					</p>
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
