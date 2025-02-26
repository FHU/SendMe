import {SlButton, SlCard, SlRating} from "@shoelace-style/shoelace/dist/react";

const css = `
  .card-overview {
    max-width: 300px;
  }

  .card-overview small {
    color: var(--sl-color-neutral-500);
  }

  .card-overview [slot="footer"] {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const Card = () => (
    <>
      <SlCard className="card-overview">
        <img
          slot="image"
          src="https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
          alt="A kitten sits patiently between a terracotta pot and decorative grasses."
        />
        <strong>Mittens</strong>
        <br />
        This kitten is as cute as he is playful. Bring him home today!
        <br />
        <small>6 weeks old</small>
        <div slot="footer">
          <SlButton variant="primary" pill>
            More Info
          </SlButton>
          <SlRating></SlRating>
        </div>
      </SlCard>
  
      <style>{css}</style>
    </>
);

export default Card;

