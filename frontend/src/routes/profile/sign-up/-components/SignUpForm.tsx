import api from "@sendme/api";
import { SlButton, SlCard, SlInput } from "@shoelace-style/shoelace/dist/react";
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
	onSuccess: () => void;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
	const [email, setEmail] = useState("");
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [display_name, setDisplayName] = useState("");
	const [responseMessage, setResponseMessage] = useState("");
	const [isError, setIsError] = useState(false);
	const { mutateAsync } = api.users.createUser.useMutation();

	const makeUser = async (): Promise<void> => {
		setResponseMessage("");
		setIsError(false);

		try {
			await mutateAsync({
				body: {
					email,
					first_name,
					last_name,
					display_name,
				},
			});

			onSuccess();
		} catch {
			setIsError(true);
			setResponseMessage("Something went wrong.");
		}
	};

	const handleCloseBanner = (): void => {
		setResponseMessage("");
	};

	const handleSlInput = (
		e: Event,
		set: React.Dispatch<React.SetStateAction<string>>,
	) => {
		const target = e.target as HTMLInputElement;
		set(target.value);
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
					<Title>Sign Up!</Title>

					<StyledInput
						placeholder="Email"
						value={email}
						onSlInput={(e: Event) => handleSlInput(e, setEmail)}
						clearable
					/>

					<StyledInput
						placeholder="First Name"
						value={first_name}
						onSlInput={(e: Event) => handleSlInput(e, setFirstName)}
						clearable
					/>

					<StyledInput
						placeholder="Last Name"
						value={last_name}
						onSlInput={(e: Event) => handleSlInput(e, setLastName)}
						clearable
					/>

					<StyledInput
						placeholder="Display Name"
						value={display_name}
						onSlInput={(e: Event) => handleSlInput(e, setDisplayName)}
						clearable
					/>

					<LoginButton onClick={makeUser}>Sign Up</LoginButton>
				</CardBody>
			</InvisibleCard>
		</FormWrapper>
	);
};

export default SignUpForm;
