import { SlIconButton } from "@shoelace-style/shoelace/dist/react";
import { useState } from "react";
import styled from "styled-components";

const InfoContainer = styled.div`
  background-color: white;
  padding: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  width: 400px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.2rem;
  border-bottom: 1px solid #ddd;
  padding-bottom: 5px;
`;

const Content = styled.p`
  font-size: 0.9rem;
  color: #333;
  line-height: 1.4;
  margin-top: 10px;
`;

const SocialIconsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const SocialInputsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 6px;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const IconRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const Label = styled.label`
  width: 70px;
`;

const StyledLink = styled.a`
  color: inherit;
  text-decoration: none;
  &:hover {
    opacity: 0.7;
  }
`;

const platforms = [
  { name: "facebook", label: "Facebook" },
  { name: "tiktok", label: "TikTok" },
  { name: "linkedin", label: "LinkedIn" },
  { name: "twitter-x", label: "X" },
];

const Info = ({ isEditing }: { isEditing: boolean }) => {
  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({
    "facebook": "",
    "tiktok": "",
    "linkedin": "",
    "twitter-x": "",
  });

  const handleChange = (platform: string, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [platform]: value }));
  };

  return (
    <InfoContainer>
      <Header>
        <span>About Me</span>
      </Header>

      {isEditing ? (
        <textarea
          style={{
            width: "100%",
            height: "100px",
            fontFamily: "Arial",
            fontSize: "0.9rem",
            color: "#333",
          }}
          defaultValue="As a graduate from Freed-Hardeman University, I managed all aspects..."
        />
      ) : (
        <Content>
          As a graduate from Freed-Hardeman University, I managed all aspects...
        </Content>
      )}

      {isEditing ? (
        <SocialInputsColumn>
          {platforms.map(({ name, label }) => (
            <IconRow key={name}>
              <Label>
                <SlIconButton name={name} label={label} />
              </Label>
              <Input
                placeholder={`Link to ${label}`}
                value={socialLinks[name] || ""}
                onChange={(e) => handleChange(name, e.target.value)}
              />
            </IconRow>
          ))}
        </SocialInputsColumn>
      ) : (
        <SocialIconsRow>
          {platforms.map(({ name, label }) =>
            socialLinks[name]?.trim() ? (
              <StyledLink
                key={name}
                href={socialLinks[name]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SlIconButton name={name} label={label} />
              </StyledLink>
            ) : null
          )}
        </SocialIconsRow>
      )}
    </InfoContainer>
  );
};

export default Info;
