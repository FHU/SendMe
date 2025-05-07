import api from "@sendme/api";
import { SlButton, SlCard, SlInput } from "@shoelace-style/shoelace/dist/react";
import { useRouter } from "@tanstack/react-router";
import type React from "react";
import { useState } from "react";
import styled from "styled-components";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
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
  border-radius: 24px;
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
  &::part(base) {
    background-color: var(--sl-color-neutral-50);
  }
  width: 400px;
  max-width: 90%;
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
  margin: 0;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--sl-color-text);
  text-align: center;
`;

const StyledInput = styled(SlInput)`
  width: 100%;
  --sl-input-border-width: 2px;
  --sl-input-border-style: solid;
  --sl-input-border-color: var(--sl-color-text);
  --sl-input-font-size-medium: 1rem;
  --sl-input-height-medium: 2.75rem;
  --sl-input-background-color: var(--sl-color-text);
  --sl-input-color: var(--sl-color-primary-50);

  color: var(--sl-color-text);
  border-radius: 24px;
`;

const LoginButton = styled(SlButton)`
  &::part(base) {
    background-color: var(--sl-color-primary-500);
    color: #fff;
    border: 2px solid var(--sl-color-primary-700);
    border-radius: 30px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    outline: none;
    box-shadow: none;
  }

  &::part(base):hover {
    background-color: var(--sl-hover-color);
    border-color: var(--sl-color-primary-700);
  }
  &::part(base):active {
    background-color: var(--sl-color-primary-300);
    border-color: var(--sl-color-primary-300);
  }
  &::part(base):focus,
  &::part(base):focus-visible {
    outline: none;
    box-shadow: none;
  }
`;

type RequestOTPFormProps = {
	onSuccess: () => void;
};

const RequestOTPForm: React.FC<RequestOTPFormProps> = ({ onSuccess }) => {
	const [email, setEmail] = useState<string>("");
	const [responseMessage, setResponseMessage] = useState<string>("");
	const [isError, setIsError] = useState<boolean>(false);
	const { mutateAsync: requestOtp } = api.auth.requestOtp.useMutation();
	const router = useRouter();

	const requestOTP = async (): Promise<void> => {
		setResponseMessage("");
		setIsError(false);

		try {
			await requestOtp({
				body: {
					email,
				},
			});

			onSuccess(); // Switch to EnterOTPForm
			// biome-ignore lint/suspicious/noExplicitAny: try catch blocks require any or unknown for error type
		} catch (error: any) {
			console.error(error);
			if (error.detail?.includes("User not found")) {
				setIsError(true);
				setResponseMessage("User not found");
				router.navigate({ to: "/auth/sign-up" });
			} else {
				setIsError(true);
				setResponseMessage("Something went wrong.");
			}
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
					<Title>Sign in to Your Account</Title>

					<StyledInput
						placeholder="Email"
						value={email}
						onSlInput={handleSlInput}
						clearable
					/>

					<LoginButton onClick={requestOTP}>LOGIN</LoginButton>
				</CardBody>
			</InvisibleCard>
		</FormWrapper>
	);
};

export default RequestOTPForm;
