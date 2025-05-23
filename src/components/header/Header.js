import styled from 'styled-components';
import { Logo } from './Logo';
import { Filters } from '../filters';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filters />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 930px) {
    flex-direction: column;
  }

  @media (max-width: 530px) {
    flex-direction: column;
  }
`;
