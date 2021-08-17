import styled from 'styled-components/macro';

import { useAuth, useRouter } from '@hedwig/hooks';
import logo from '@hedwig/assets/images/HedwigLogo.svg';
import { Navigate } from 'react-router-dom';

const MainDiv = styled.div`
  font-family: 'Omnes', sans-serif;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;

  background-color: white;
`;

const ElemDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-items: center;
  max-height: 70%;
`;

const Logo = styled.img`
  width: 10rem;
`;

const Title = styled.h1`
  color: #f3725b;
  font-size: 3.3rem;
  margin: 0.1rem;
  font-family: 'Omnes', sans-serif;
  font-style: normal;
  font-weight: 500;
`;
const LoginButton = styled.button`
  border-radius: 25pt;
  height: 2.2rem;
  width: 8.5rem;
  border: none;
  font-size: 0.8rem;
  background-color: #f3725b;
  color: white;
  font-weight: bold;
  :hover {
    text-decoration: underline;
  }
  :focus {
    outline: none;
  }
`;

export const Login = (): JSX.Element => {
  const auth = useAuth();
  const router = useRouter();

  return auth == null || typeof auth === 'undefined' || auth?.user == null ? (
    <MainDiv>
      <ElemDiv>
        <Logo src={logo} />
        <Title>hedwig</Title>
        <LoginButton
          onClick={() => {
            auth?.signin().then(() => router.push('/eat'));
          }}
        >
          Login with NetID
        </LoginButton>
      </ElemDiv>
    </MainDiv>
  ) : (
    <Navigate to="/eat" />
  );
};
