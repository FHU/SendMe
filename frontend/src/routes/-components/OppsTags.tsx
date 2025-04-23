import { SlTag } from "@shoelace-style/shoelace/dist/react";
import styled from "styled-components";
import { useState } from "react";

const ScrollerWrapper = styled.div`
  width: 80%;
  padding: 20px;
`;
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
  cursor: pointer;
`;

const OppTags = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [unselectedTags, setUnselectedTags] = useState<string[]>([
    "Preacher",
    "Youth",
    "Education",
    "Leadership",
    "Paid",
    "Evangelism",
    "Volunteer",
    "Hospitality",
    "Singing",
    "Construction",
    "Lawn",
    "Landscaping",
  ]);
  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags((tags) => tags.filter((tag) => tag !== tagToRemove));
    setUnselectedTags((tags) => [...tags, tagToRemove]);
  };

  const handleAddTag = (tagToAdd: string) => {
    setUnselectedTags((tags) => tags.filter((tag) => tag !== tagToAdd));
    setSelectedTags((tags) => [...tags, tagToAdd]);
  };
  return (
    <>
      <ScrollerWrapper>
        <TagsScroller>
          {selectedTags.map((tag, id) => (
            <TagWrapper key={`selected-${id}`}>
              <StyledTag
                variant="success"
                size="medium"
                removable
                pill
                onSlRemove={() => handleRemoveTag(tag)}
              >
                {tag}
              </StyledTag>
            </TagWrapper>
          ))}
        </TagsScroller>
        <TagsScroller>
          {unselectedTags.map((tag, id) => (
            <TagWrapper key={`unselected-${id}`}>
              <StyledTag
                variant="success"
                size="medium"
                pill
                onClick={() => handleAddTag(tag)}
              >
                {tag}
              </StyledTag>
            </TagWrapper>
          ))}
        </TagsScroller>
      </ScrollerWrapper>
    </>
  );
};

export default OppTags;
