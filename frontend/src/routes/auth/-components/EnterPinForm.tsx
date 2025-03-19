import { SlButton, SlCard, SlInput } from "@shoelace-style/shoelace/dist/react";
import type React from "react";
import { useState } from "react";
import styled from "styled-components";

const InvisibleCard = styled(SlCard)`
  width: 400px;
  max-width: 90%;
  background-color: #f7f7f7;
  border: none;
  box-shadow: none;
  padding: 0;
  border-radius: 60px;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 1.4rem;
  font-weight: 500;
  color: #333;
  text-align: center;
`;

const StyledInput = styled(SlInput)`
  width: 100%;
  border-radius: 24px;
`;

const SubmitButton = styled(SlButton)`
  &::part(base) {
    background-color: #28a745;
    color: #fff;
    border-radius: 30px;
    padding: 0.75rem 1.5rem;
  }
`;

type EnterPinFormProps = {
	loginToken: string | null;
	onAuthSuccess: () => void;
};

const EnterPinForm: React.FC<EnterPinFormProps> = ({
	loginToken,
	onAuthSuccess,
}) => {
	const [pin, setPin] = useState<string>("");
	const [responseMessage, setResponseMessage] = useState<string>("");

	const handleSlInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setPin(target.value);
	};

	const submitPin = async () => {
		if (!loginToken) {
			console.error("Missing login token!");
			return;
		}

		try {
			const response = await fetch("/api/auth/sessiontoken", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ login_token: loginToken, pin }),
			});

			if (response.ok) {
				onAuthSuccess();
				const data = await response.json();
				console.log("Session Token:", data.session_token);
			}
			if (!response.ok) {
				setResponseMessage("Something went wrong. Please try again.");
				return;
			} else {
				console.error("Invalid PIN.");
			}
		} catch (error) {
			console.error("Network error.");
		}
	};

	return (
		<InvisibleCard>
			<CardBody>
				<Title>Enter Your PIN</Title>
				<StyledInput
					placeholder="Enter your PIN"
					value={pin}
					onSlInput={handleSlInput}
					clearable
				/>
				<SubmitButton onClick={submitPin}>SUBMIT</SubmitButton>
			</CardBody>
		</InvisibleCard>
	);
};

export default EnterPinForm;
