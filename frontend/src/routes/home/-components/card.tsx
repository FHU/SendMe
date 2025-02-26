import { SlButton, SlCard, SlRating } from "@shoelace-style/shoelace/dist/react";
import { SlDetails } from "@shoelace-style/shoelace/dist/react";
import { SlTag, SlAvatar, SlIconButton } from "@shoelace-style/shoelace/dist/react";



const css = `
  .card-overview {
    max-width: 400px;
    --border-radius: 7%;
  }

  strong {
  font-size: 30px;
  }

  .card-title {
    display: flex;
    display-content: row;
    justify-content: space-between;
  }

  .card-overview small {
    color: var(--sl-color-neutral-500);
  }

  .avatar {
    display: flex;
    display-content: row;
    gap: 10px;
  }

  SlAvatar.avatar-image {
    --size: 600px;
  }

  .tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .more-details {
    display: flex;
    flex-direction: column;
  }

`;
const Card = () => (
    <>
      <SlCard className="card-overview">
        {/* <img
          slot="image"
          src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
          alt="A kitten sits patiently between a terracotta pot and decorative grasses."
        /> */}
        <div className="card-title">
            <div>
                <strong>Ministry Leadership</strong>
                <br />
                <small>12/14/24</small>  
            </div>
            <div>
                <SlIconButton name="bookmark" label="Bookmark" />
            </div>
        </div>
        <br />
        <div className="avatar">
            <div className="avatar-image">
                <SlAvatar
                    image="https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
                > </SlAvatar> 
            </div>
            <div className="avatar-info">
                Liam Carter
                <br />
                <small>Oak Tree Church of Christ</small>
                <br />
                <small>Dallas, TX, USA</small>
            </div>  
        </div>
        <br />
        <div className="tags">
            <SlTag variant="warning" size="medium" pill>
                Medium
            </SlTag>
            <SlTag variant="warning" size="medium" pill>
                Medium
            </SlTag>
            <SlTag variant="warning" size="medium" pill>
                Medium
            </SlTag>
            <SlTag variant="warning" size="medium" pill>
                Medium
            </SlTag> 
            <SlTag variant="warning" size="medium" pill>
                Medium
            </SlTag>
        </div>
        <br />
        <div className="short-bio">
            Youth Ministry experience needed at Oak Tree Church of Christ!
        </div>
        <br />
        <div className="details">
            <SlDetails summary="More Details">
                <div className="more-details">
                    <h3>Position</h3>
                    <p>Ministry Leadership and Staff</p> 
                    <h3>Description</h3>
                    <p>Our congregation is holding sessions for spirituality in different facets of life, and we are seeking someone knowledgeable in psychology and/or sociology for this job. There will be two days of sessions, and we would like anyone who has availability for these times. Thank you!</p>
                    <h3>Time of Event</h3>
                    <p>N/A</p>  
                </div>
                
            </SlDetails> 
        </div>
        
      </SlCard>
  
      <style>{css}</style>
    </>
);

export default Card;

