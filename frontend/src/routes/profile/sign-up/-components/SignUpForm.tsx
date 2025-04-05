import api from "@sendme/api";
import { SlButton, SlCard, SlInput } from "@shoelace-style/shoelace/dist/react";
import type React from "react";
import { useState, useCallback } from "react";
import styled from "styled-components";

const FormWrapper = styled.form`
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
  width: 400px;
  max-width: 90%;
  background-color: var(--sl-color-neutral-50);
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
    background-color: var(--sl-color-primary-700);
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

type SignUpFormProps = {
	onSuccess?: () => void;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
	const [responseMessage, setResponseMessage] = useState("");
	const { mutateAsync, isError } = api.users.createUser.useMutation();

	const onSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const formData = new FormData(e.currentTarget);

			mutateAsync({
				body: {
					email: formData.get("email")?.toString() || "",
					display_name: formData.get("display_name")?.toString() || "",
					first_name: formData.get("first_name")?.toString() || "",
					last_name: formData.get("last_name")?.toString() || "",
				},
			})
				.catch((error) => {
					setResponseMessage(error.detail);
				})
				.then(() => {
					if (onSuccess) onSuccess();
				});
		},
		[mutateAsync, onSuccess],
	);

	const handleCloseBanner = (): void => {
		setResponseMessage("");
	};

	return (
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

					<StyledInput placeholder="Email" label="email" clearable />

					<StyledInput placeholder="First Name" label="first_name" clearable />

					<StyledInput placeholder="Last Name" label="last_name" clearable />

					<StyledInput
						placeholder="Display Name"
						label="display_name"
						clearable
					/>
					<SignUpButton type="submit">Sign Up</SignUpButton>
				</CardBody>
			</InvisibleCard>
		</FormWrapper>
	);
};

export default SignUpForm;
