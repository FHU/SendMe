import styled from 'styled-components';
import { createFileRoute } from '@tanstack/react-router'
import Header from './-components/header'

export const Route = createFileRoute('/home/')({
  component: RouteComponent,
})

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function RouteComponent() {
  return <HeaderContainer>
    <Header/>
  </HeaderContainer>
}