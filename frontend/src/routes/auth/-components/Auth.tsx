import { SlButton, SlCard, SlInput } from "@shoelace-style/shoelace/dist/react";
import type React from "react";
import { useState } from "react";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column; /* Stacks banner above the card area */
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f7f7; /* Page background color */
`;

const RedBanner = styled.div`
  background-color: #dc3545;
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  width: 300px;
  max-width: 90%;
  margin-bottom: 1.5rem;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  line-height: 1;
  font-weight: bold;
  cursor: pointer;
  margin-left: 1rem;
`;

const InvisibleCard = styled(SlCard)`
  width: 400px;
  max-width: 90%;
  background-color: #f7f7f7;
  border: none;
  box-shadow: none;
  padding: 0;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem; /* Increased to add more vertical padding between elements */
  padding: 1rem;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  font-weight: 500;
  color: #333;
  text-align: center;
`;

const StyledInput = styled(SlInput)`
  width: 100%;
  --sl-input-border-width: 2px;
  --sl-input-border-style: solid;
  --sl-input-border-color: #000;
  --sl-input-font-size-medium: 1rem;
  --sl-input-height-medium: 2.75rem;
`;

const LoginButton = styled(SlButton)`
  &::part(base) {
    background-color: #007bff;
    color: #fff;
    border: 2px solid #007bff;
    border-radius: 24px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    outline: none;
    box-shadow: none;
  }

  &::part(base):hover {
    background-color: #0069d9;
    border-color: #0069d9;
  }
  &::part(base):active {
    background-color: #005cbf;
    border-color: #005cbf;
  }
  &::part(base):focus,
  &::part(base):focus-visible {
    outline: none;
    box-shadow: none;
  }
`;

type RequestPinFormProps = Record<string, never>;

const RequestPinForm: React.FC<RequestPinFormProps> = () => {
	const [email, setEmail] = useState<string>("");
	const [responseMessage, setResponseMessage] = useState<string>("");
	const [isError, setIsError] = useState<boolean>(false);

	const requestPin = async (): Promise<void> => {
		setResponseMessage("");
		setIsError(false);

		try {
			const response = await fetch("/auth/pin", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});

			if (!response.ok) {
				setIsError(true);
				setResponseMessage("Something went wrong.");
				return;
			}
			setResponseMessage("Check your email for your pin.");
		} catch (error) {
			setIsError(true);
			setResponseMessage("Something went wrong.");
		}
	};

	const handleCloseBanner = (): void => {
		setResponseMessage("");
	};

	const handleSlInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setEmail(target.value);
	};

	return (
		<FormWrapper>
			{responseMessage && (
				<RedBanner>
					<span>{responseMessage}</span>
					<CloseButton onClick={handleCloseBanner}>×</CloseButton>
				</RedBanner>
			)}

			<InvisibleCard>
				<CardBody>
					<Title>Sign in to Your Account.</Title>

					<StyledInput
						placeholder="   Enter your email"
						value={email}
						onSlInput={handleSlInput}
						clearable
					/>

					<LoginButton onClick={requestPin}>LOGIN</LoginButton>
				</CardBody>
			</InvisibleCard>
		</FormWrapper>
	);
};

export default RequestPinForm;
