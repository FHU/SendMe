import { SlButton, SlCard, SlRating } from "@shoelace-style/shoelace/dist/react";
import { SlDetails } from "@shoelace-style/shoelace/dist/react";
import { SlTag, SlAvatar, SlIconButton } from "@shoelace-style/shoelace/dist/react";



const css = `
  .card-overview {
    max-width: 300px;
  }

  .card-title {
    display: flex;
    display-content: row;
    justify-content: space-between;
  }

  .card-overview small {
    color: var(--sl-color-neutral-500);
  }

  .card-overview [slot="footer"] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .avatar {
    display: flex;
    display-content: row;
  }
  .tags {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
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
                label="Avatar of a gray tabby kitten looking down"
                />  
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
        <div className="details">
            <SlDetails summary="Toggle Me">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </SlDetails> 
        </div>
        
      </SlCard>
  
      <style>{css}</style>
    </>
);

export default Card;

