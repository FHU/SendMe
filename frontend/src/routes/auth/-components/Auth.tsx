import { useRouter } from '@tanstack/react-router';
import { useState } from 'react';
import styled from 'styled-components';
import EnterOTPForm from './EnterOTPForm';
import RequestOTPForm from './RequestOTPForm';
import { useUser } from 'src/routes/-hooks/UseUser';

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
  const { setUserToLoggedIn } = useUser();

  const handleAuthSuccess = () => {
    setUserToLoggedIn();
    router.navigate({ to: '/opportunities' }); // Navigate to the opportunities page
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
