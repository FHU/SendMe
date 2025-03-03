import styled from 'styled-components';
import { SlButton, SlCard, SlDetails, SlTag, SlAvatar, SlIconButton, SlIcon } from "@shoelace-style/shoelace/dist/react";

const CardContainer = styled(SlCard)`
  max-width: 400px;
  --border-radius: 7%;
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

const Card1 = () => (
    <CardContainer>
        <CardTitle>
            <div>
                <StrongText>Youth Ministry Internship</StrongText>
                <br />
                <small>12/20/24</small>  
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
                    David Reynolds
                    <br />
                    <small>Dallas Church of Christ</small>
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
        </TagsContainer>
        <br />
        <div>A summer internship designed for seminary students or aspiring preachers to gain hands-on ministry experience.</div>
        <br />
        <SlDetails summary="More Details">
            <MoreDetails>
                <div>
                    <h3>Position</h3>
                    <p>Ministry Leadership and Staff</p>   
                </div>
                <div>
                    <h3>Description</h3>
                    <p>This preaching internship at Dallas Church of Christ is an opportunity for young ministers to develop their preaching skills. Interns will assist in sermon preparation, deliver messages in small group settings, participate in visitations, and receive mentorship from seasoned ministers. The program is structured to provide real-world ministry experience in a supportive church environment.</p> 
                </div>
                <div>
                    <h3>Time of Event</h3>
                    <p>N/A</p>   
                </div>
            </MoreDetails>
        </SlDetails>
    </CardContainer>
);

export default Card1;