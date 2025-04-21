import api, { type components } from "@sendme/api";
import {
	SlAvatar,
	SlButton,
	SlCard,
	SlDetails,
	SlIcon,
	SlIconButton,
	SlTag,
} from "@shoelace-style/shoelace/dist/react";
// import { useQuery } from "@tanstack/react-query";
// import {
// 	JSXElementConstructor,
// 	Key,
// 	ReactElement,
// 	ReactNode,
// 	ReactPortal,
// } from "react";
import styled from "styled-components";

// import { SlRelativeTime } from "@shoelace-style/shoelace/dist/react";

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

const CardTitleDate = styled.div`
	display: flex;
	flex-direction: column;
`;

const StrongText = styled.strong`
  font-size: 30px;
`;

const AvatarSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const AvatarInfo = styled.div`
  display: flex;
  gap: 10px;
`;

const AvatarBio = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const SmallBio = styled.div`
	padding-bottom: 1rem;
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

export function OpportunitiesList({
	data,
}: {
	data: components["schemas"]["Opportunity"][];
}): JSX.Element {
	return (
		<>
			{data?.map((o) => (
				<CardContainer key={o.id}>
					<CardTitle>
						<CardTitleDate>
							<StrongText>{o.title}</StrongText>
							<small>{o.created_at}</small>
						</CardTitleDate>
						<Bookmark>
							<div className="icon-button-color">
								<SlIconButton name="bookmark" label="Bookmark" />
							</div>
						</Bookmark>
					</CardTitle>
					<AvatarSection>
						<AvatarInfo>
							<SlAvatar image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" />
							<AvatarBio>
								Oak Tree Hill
								<small>{o.contact_user}</small>
								<small>{o.location}</small>
							</AvatarBio>
						</AvatarInfo>
						<SlButton variant="success" size="large" outline>
							<SlIcon slot="prefix" name="envelope" color="green" />
							Message
						</SlButton>
					</AvatarSection>
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
					<SmallBio>
						<div>{o.summary}</div>
					</SmallBio>
					<SlDetails summary="More Details">
						<MoreDetails>
							<div>
								<h3>Position</h3>
								<p>Ministry Leadership and Staff</p>
							</div>
							<div>
								<h3>Description</h3>
								<p>{o.description}</p>
							</div>
							<div>
								<h3>Time of Event</h3>
								{/* <p>N/A</p> */}
								<p>Date of even</p>
							</div>
						</MoreDetails>
					</SlDetails>
				</CardContainer>
			))}
		</>
	);
}
