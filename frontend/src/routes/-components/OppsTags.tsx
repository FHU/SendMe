import {
  SlButtonGroup,
  SlButton,
  SlTag,
  SlIcon,
} from "@shoelace-style/shoelace/dist/react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/*const TagsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;
`;*/

const tags = [
  "Preacher",
  "Youth",
  "Education",
  "Leadership",
  "Paid",
  "Education",
  "Leadership",
  "Paid",
  "Leadership",
  "Paid",
  "Education",
  "Leadership",
  "Paid",
];

const OppTags = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  return (
    <>
      <div
        style={{ width: "100%", padding: "20px", backgroundColor: "#121212" }}
      >
        <Slider {...settings}>
          {tags.map((tag, id) => (
            <div key={id}>
              <SlTag variant="success" size="medium">
                {tag}
              </SlTag>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default OppTags;
