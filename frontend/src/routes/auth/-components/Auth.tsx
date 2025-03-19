import { useState } from 'react';
import { useRouter } from '@tanstack/react-router';
import RequestPinForm from './RequestPinForm';
import EnterPinForm from './EnterPinForm';
import styled from 'styled-components';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const AuthForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loginToken, setLoginToken] = useState<string | null>(null);
  const router = useRouter(); // Get the router instance

  const handleAuthSuccess = () => {
    router.navigate({ to: '/opportunities' }); // Navigate to the opportunities page
  };

  return (
    <FormWrapper>
      {isSuccess ? (
        <EnterPinForm
          loginToken={loginToken}
          onAuthSuccess={handleAuthSuccess}
        />
      ) : (
        <RequestPinForm
          onSuccess={(token: string) => {
            setLoginToken(token);
            setIsSuccess(true);
          }}
        />
      )}
    </FormWrapper>
  );
};

export default AuthForm;
