import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import styled from "styled-components";
import EnterOTPForm from "./EnterPinForm";
import RequestPinForm from "./RequestPinForm";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const AuthForm: React.FC = () => {
	const [isSuccess, setIsSuccess] = useState(false);
	const router = useRouter(); // Get the router instance

	const handleAuthSuccess = () => {
		router.navigate({ to: "/opportunities" }); // Navigate to the opportunities page
	};

	return (
		<FormWrapper>
			{isSuccess ? (
				<EnterOTPForm onAuthSuccess={handleAuthSuccess} />
			) : (
				<RequestPinForm
					onSuccess={() => {
						setIsSuccess(true);
					}}
				/>
			)}
		</FormWrapper>
	);
};

export default AuthForm;
