import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import styled from "styled-components";
import EnterOTPForm from "./EnterOTPForm";
import RequestOTPForm from "./RequestOTPForm";

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
		router.navigate({ to: "/opportunities/create" }); // Navigate to the opportunities page
	};

	return (
		<FormWrapper>
			{isSuccess ? (
				<EnterOTPForm onAuthSuccess={handleAuthSuccess} />
			) : (
				<RequestOTPForm
					onSuccess={() => {
						setIsSuccess(true);
					}}
				/>
			)}
		</FormWrapper>
	);
};

export default AuthForm;
