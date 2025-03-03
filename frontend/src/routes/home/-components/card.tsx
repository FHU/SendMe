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

const Card = () => (
    <CardContainer>
        <CardTitle>
            <div>
                <StrongText>Ministry Leadership</StrongText>
                <br />
                <small>12/14/24</small>  
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
                    Liam Carter
                    <br />
                    <small>Oak Tree Church of Christ</small>
                    <br />
                    <small>Dallas, TX, USA</small>
                </div>   
            </AvatarInfo>
            <SlButton variant="default" size="large">
                <SlIcon slot="prefix" name="envelope" color="orange"></SlIcon>
                Message
            </SlButton>
        </AvatarSection>
        <br />
        <TagsContainer>
            <SlTag variant="warning" size="medium" pill>Preacher</SlTag>
            <SlTag variant="warning" size="medium" pill>Youth</SlTag>
            <SlTag variant="warning" size="medium" pill>Education</SlTag>
            <SlTag variant="warning" size="medium" pill>Leadership</SlTag> 
            <SlTag variant="warning" size="medium" pill>Paid</SlTag>
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
                    <p>Our congregation is holding sessions for spirituality in different facets of life, and we are seeking someone knowledgeable in psychology and/or sociology for this job. There will be two days of sessions, and we would like anyone who has availability for these times. Thank you!</p> 
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