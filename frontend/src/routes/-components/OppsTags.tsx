import { SlTag } from "@shoelace-style/shoelace/dist/react";
import styled from "styled-components";
import { useState } from "react";

const TagsScroller = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 10px 20px;
  gap: 16px;
  scroll-snap-type: x mandatory;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const TagWrapper = styled.div`
  scroll-snap-align: start;
  flex-shrink: 0;
`;

const StyledTag = styled(SlTag)`
  display: flex;
  align-items: center;
`;

const OppTags = () => {
  const [tags, setTags] = useState([
    "Preacher",
    "Youth",
    "Education",
    "Leadership",
    "Paid",
    "Evangelism",
    "Leadership",
    "Volunteer",
    "Hospitality",
    "Singing",
    "Construction",
    "Lawn",
    "Landscaping",
  ]);
  const handleRemove = (tagToRemove: string) => {
    setTags((tags) => tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <>
      <div
        style={{
          width: "80%",
          padding: "20px",
        }}
      >
        <TagsScroller>
          {tags.map((tag, id) => (
            <TagWrapper key={id}>
              <StyledTag
                variant="success"
                size="medium"
                removable
                onSlRemove={() => handleRemove(tag)}
              >
                {tag}
              </StyledTag>
            </TagWrapper>
          ))}
        </TagsScroller>
      </div>
    </>
  );
};

export default OppTags;
