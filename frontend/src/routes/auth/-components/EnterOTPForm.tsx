import api from "@sendme/api";
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
    text-transform: uppercase;
  }
`;

type EnterOTPFormProps = {
	onAuthSuccess: () => void;
};

const EnterOTPForm: React.FC<EnterOTPFormProps> = ({ onAuthSuccess }) => {
	const [otp, setOtp] = useState<string>("");
	const [responseMessage, setResponseMessage] = useState<string>("");
	const { mutateAsync: enterOtp, isSuccess } = api.auth.enterOtp.useMutation();

	const handleSlInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		setOtp(target.value);
	};

	const submitPin = async () => {
		try {
			await enterOtp({
				body: {
					otp: otp,
				},
			});

			onAuthSuccess();
		} catch (error) {
			setResponseMessage("Something went wrong. Please try again.");
		}
	};

	return (
		<InvisibleCard>
			<CardBody>
				<Title>Enter Login Code</Title>
				<StyledInput
					placeholder="Login Code"
					value={otp}
					onSlInput={handleSlInput}
					clearable
				/>
				<SubmitButton onClick={submitPin}>Submit</SubmitButton>
				{isSuccess && <Title>Login Successful</Title>}
			</CardBody>
		</InvisibleCard>
	);
};

export default EnterOTPForm;
