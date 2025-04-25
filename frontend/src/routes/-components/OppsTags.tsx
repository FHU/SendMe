import { SlTag } from "@shoelace-style/shoelace/dist/react";
import { useState, useRef } from "react";
import styled from "styled-components";

const ScrollerWrapper = styled.div`
  width: 100%;
  gap: 10px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const TagsAndButtonsWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const TagsScroller = styled.div`
  display: flex;
  overflow-x: scroll;
  gap: 16px;
  flex: 1;
  scroll-behavior: smooth;
  padding-bottom: 4px;
  min-height: 60px;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 6px;
  }
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  overflow-y: hidden;

  -webkit-overflow-scrolling: touch;
  touch-action: pan-x;
`;

const TagWrapper = styled.div`
  scroll-snap-align: start;
  flex-shrink: 0;
`;

const StyledTag = styled(SlTag)`
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

  const selectedRef = useRef<HTMLDivElement>(null);
  const unselectedRef = useRef<HTMLDivElement>(null);

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags((tags) => tags.filter((tag) => tag !== tagToRemove));
    setUnselectedTags((tags) => [...tags, tagToRemove]);
  };

  const handleAddTag = (tagToAdd: string) => {
    setUnselectedTags((tags) => tags.filter((tag) => tag !== tagToAdd));
    setSelectedTags((tags) => [...tags, tagToAdd]);
  };

  return (
    <ScrollerWrapper>
      <TagsAndButtonsWrapper>
        <TagsScroller ref={selectedRef}>
          {selectedTags.map((tag) => (
            <TagWrapper key={`selected-${tag}`}>
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
      </TagsAndButtonsWrapper>

      <TagsAndButtonsWrapper>
        <TagsScroller ref={unselectedRef}>
          {unselectedTags.map((tag) => (
            <TagWrapper key={`unselected-${tag}`}>
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
      </TagsAndButtonsWrapper>
    </ScrollerWrapper>
  );
};

export default OppTags;
