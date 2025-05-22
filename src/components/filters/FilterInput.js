import styled from 'styled-components';

export function FilterInput(props) {
  return <Input {...props} />;
}

const Input = styled.input`
  font-size: var(--font-m);
  width: 180px;
  border-radius: var(--radius200);
  border: 1px solid var(--accent);
  padding: var(--padding300) var(--padding400);
  background-color: var(--main);
  font-family: var(--font-inter);
  color: var(--text_default_value);
  outline: none;
  text-overflow: ellipsis;

  &::placeholder {
    color: var(--text_default_tertiary);
  }

  &:hover,
  &:focus {
    background-color: var(--light-main);
  }

  @media (max-width: 930px) {
    width: 150px;
  }

  @media (max-width: 530px) {
    width: 240px;
  }
`;
