import api from "@sendme/api";
import { SlButton, SlCard, SlInput } from "@shoelace-style/shoelace/dist/react";
import type React from "react";
import { useState } from "react";
import styled from "styled-components";

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

const SubmitButton = styled(SlButton)`
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
