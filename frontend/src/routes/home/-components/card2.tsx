import styled from 'styled-components';
import { SlButton, SlCard, SlDetails, SlTag, SlAvatar, SlIconButton, SlIcon } from "@shoelace-style/shoelace/dist/react";

const CardContainer = styled(SlCard)`
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

const Card2 = () => (
    <CardContainer>
        <CardTitle>
            <div>
                <StrongText>Mission Work</StrongText>
                <br />
                <small>1/20/2025</small>  
            </div>
            <div>
                <SlIconButton name="bookmark" label="Bookmark" />
            </div>
        </CardTitle>
        <br />
        <AvatarSection>
            <AvatarInfo>
                <SlAvatar
                    image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                />
                <div>
                    Samuel Thompson
                    <br />
                    <small>Global Hands Outreach</small>
                    <br />
                    <small>Rio de Janiero, Brazil</small>
                </div>   
            </AvatarInfo>
            <SlButton variant="default" size="large">
                <SlIcon slot="prefix" name="envelope" color="orange"></SlIcon>
                Message
            </SlButton>
        </AvatarSection>
        <br />
        <TagsContainer>
            <SlTag variant="warning" size="medium" pill>Mission Work</SlTag>
            <SlTag variant="warning" size="medium" pill>Healthcare</SlTag>
            <SlTag variant="warning" size="medium" pill>Education</SlTag>
            <SlTag variant="warning" size="medium" pill>Leadership</SlTag>
        </TagsContainer>
        <br />
        <div>Mission trip outreach in neighboring cities of Rio.</div>
        <br />
        <SlDetails summary="More Details">
            <MoreDetails>
                <div>
                    <h3>Position</h3>
                    <p>Mission Trip Participant</p>   
                </div>
                <div>
                    <h3>Description</h3>
                    <p>Join us on a mission trip to the neighboring cities of Rio, where we will engage in outreach efforts to serve local communities. Activities will include distributing essential supplies, assisting with community projects, and sharing the message of faith. This trip is a wonderful opportunity to make a meaningful impact while growing spiritually and building lasting relationships with fellow believers.</p> 
                </div>
                <div>
                    <h3>Time of Event</h3>
                    <p>N/A</p>   
                </div>
            </MoreDetails>
        </SlDetails>
    </CardContainer>
);

export default Card2;