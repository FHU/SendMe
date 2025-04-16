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

const Info = ({ isEditing }: { isEditing: boolean }) => {
	const [socialLinks, setSocialLinks] = useState({
		facebook: "https://facebook.com/yourprofile",
		tiktok: "https://tiktok.com/@yourprofile",
		linkedin: "https://linkedin.com/in/yourprofile",
		x: "https://x.com/yourprofile",
	});

	const handleChange = (platform: keyof typeof socialLinks, value: string) => {
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
					<IconRow>
						<Label>
							<SlIconButton name="facebook" label="Facebook" />
						</Label>
						<Input
							placeholder="Link to Facebook"
							onChange={(e) => handleChange("facebook", e.target.value)}
						/>
					</IconRow>
					<IconRow>
						<Label>
							<SlIconButton name="tiktok" label="TikTok" />
						</Label>
						<Input
							placeholder="Link to TikTok"
							onChange={(e) => handleChange("tiktok", e.target.value)}
						/>
					</IconRow>
					<IconRow>
						<Label>
							<SlIconButton name="linkedin" label="LinkedIn" />
						</Label>
						<Input
							placeholder="Link to LinkedIn"
							onChange={(e) => handleChange("linkedin", e.target.value)}
						/>
					</IconRow>
					<IconRow>
						<Label>
							<SlIconButton name="twitter-x" label="X" />
						</Label>
						<Input
							placeholder="Link to X"
							onChange={(e) => handleChange("x", e.target.value)}
						/>
					</IconRow>
				</SocialInputsColumn>
			) : (
				<SocialIconsRow>
					<SlIconButton
						href={socialLinks.facebook}
						name="facebook"
						label="Facebook"
					/>
					<SlIconButton
						href={socialLinks.tiktok}
						name="tiktok"
						label="TikTok"
					/>
					<SlIconButton
						href={socialLinks.linkedin}
						name="linkedin"
						label="LinkedIn"
					/>
					<SlIconButton href={socialLinks.x} name="twitter-x" label="X" />
				</SocialIconsRow>
			)}
		</InfoContainer>
	);
};

export default Info;
