import api from "@sendme/api";
import {
	SlButton,
	SlCard,
	SlInput,
	SlTooltip,
} from "@shoelace-style/shoelace/dist/react";
import { useRouter } from "@tanstack/react-router";
import type React from "react";
import { useCallback, useState } from "react";
import styled from "styled-components";

import EnterOTPForm from "../../-components/EnterOTPForm";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--sl-color-neutral-50);
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
  color: var(--sl-color-text);
  border-radius: 24px;
`;

const SignUpButton = styled(SlButton)`
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

const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;
`;

type SignUpFormProps = {
	onSuccess?: () => void;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
	const [responseMessage, setResponseMessage] = useState("");
	const { mutateAsync, isSuccess } = api.users.createUser.useMutation();
	const { mutateAsync: requestOtp } = api.auth.requestOtp.useMutation();
	const router = useRouter();

	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const formData = new FormData(e.currentTarget);

			mutateAsync({
				body: {
					email: formData.get("email")?.toString() || "",
					first_name: formData.get("firstName")?.toString() || "",
					last_name: formData.get("lastName")?.toString() || "",
					location: formData.get("location")?.toString() || "",
				},
			})
				.catch((error) => {
					console.log(error);
					if (error.detail.includes("Duplicate Email Used")) {
						setResponseMessage(error.detail);
					} else {
						setResponseMessage(error.message || "Unknown error occurred");
					}
				})
				.then(async () => {
					if (onSuccess) onSuccess();
					try {
						await requestOtp({
							body: {
								email: formData.get("email")?.toString() || "",
							},
						});
					} catch {
						setResponseMessage("Something went wrong.");
					}
				});
		},
		[mutateAsync, onSuccess, requestOtp],
	);

	const handleCloseBanner = (): void => {
		setResponseMessage("");
	};

	return (
		<>
			{isSuccess ? (
				<SuccessContainer>
					{responseMessage && (
						<RedBanner>
							<span>{responseMessage}</span>
							<CloseButton onClick={handleCloseBanner}>×</CloseButton>
						</RedBanner>
					)}
					<Title>Signup Successful!</Title>
					<Title>
						A one time passoword has been sent to your email. Please enter it to
						login
					</Title>

					<EnterOTPForm
						onAuthSuccess={() => router.navigate({ to: "/profile" })}
					/>
				</SuccessContainer>
			) : (
				<FormWrapper onSubmit={onSubmit}>
					{responseMessage && (
						<RedBanner>
							<span>{responseMessage}</span>
							<CloseButton onClick={handleCloseBanner}>×</CloseButton>
						</RedBanner>
					)}

					<InvisibleCard>
						<CardBody>
							<Title>Sign Up!</Title>
							<StyledInput
								label="Email"
								placeholder="john@example.com"
								name="email"
								type="email"
								clearable
								required
							/>
							<StyledInput
								label="First Name"
								placeholder="John"
								name="firstName"
								clearable
								required
							/>
							<StyledInput
								label="Last Name"
								placeholder="Doe"
								name="lastName"
								clearable
								required
							/>

							<SlTooltip content="The location you're located. A state is fine.">
								<StyledInput
									label="Location"
									placeholder="Arlington, TX"
									name="location"
									clearable
									required
								/>
							</SlTooltip>
							<SignUpButton type="submit">Sign Up</SignUpButton>
						</CardBody>
					</InvisibleCard>
				</FormWrapper>
			)}
		</>
	);
};

export default SignUpForm;
